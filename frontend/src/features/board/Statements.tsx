import { useEffect, useState, type FormEvent } from "react";
import { animate } from "animejs";
import { addTestimony, getTestimonies } from "../../api/testimonies";
import type { Testimony } from "../../types/testimony";

export default function Statements({ slug }: { slug: string }) {
    const [items, setItems] = useState<Testimony[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const latest = items[0]?.id;

    useEffect(() => {
        getTestimonies(slug)
            .then(setItems)
            .catch((err: Error) => setStatus(err.message));
    }, [slug]);

    useEffect(() => {
        if (latest === undefined) return;
        animate(".statement:first-child", { opacity: [0, 1], scale: [1.4, 1], rotate: [-6, 0], ease: "outExpo" });
    }, [latest]);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form)) as { name: string; message: string };
        setStatus("Filing statement…");
        try {
            const created = await addTestimony(slug, data);
            setItems((s) => [created, ...s]);
            form.message.value = "";
            setStatus(null);
        } catch (err) {
            setStatus((err as Error).message);
        }
    };

    return (
        <section className="statements">
            <h2>Witness statements · {items.length}</h2>
            <form onSubmit={submit}>
                <input name="name" placeholder="Your name" maxLength={60} required aria-label="Your name" />
                <textarea
                    name="message"
                    placeholder="What did you witness?"
                    maxLength={500}
                    rows={3}
                    required
                    aria-label="Your statement"
                />
                <button type="submit">File statement</button>
                {status && <p className="statements__status">{status}</p>}
            </form>
            <ol>
                {items.map((t) => (
                    <li key={t.id} className="statement">
                        <span className="statement__name">
                            {t.name} · {new Date(t.createdAt).toLocaleDateString()}
                        </span>
                        <p>{t.message}</p>
                    </li>
                ))}
            </ol>
        </section>
    );
}
