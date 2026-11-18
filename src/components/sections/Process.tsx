import { processSteps } from '@/content/services';
import { pad2 } from '@/lib/format';
import { useInView } from '@/hooks/useInView';
import { SectionHead } from '@/components/ui/SectionHead';
import './Process.css';

function Step({ i, title, text }: { i: number; title: string; text: string }) {
  const [ref, inView] = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className={`step rv${inView ? ' in' : ''}`} style={{ transitionDelay: `${i * 0.08}s` }}>
      <span className="step__num" aria-hidden="true">
        {pad2(i + 1)}
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  );
}

export function Process() {
  return (
    <section className="sec" aria-labelledby="process-title">
      <div className="wrap">
        <SectionHead
          label="Jak pracujemy"
          title={
            <span id="process-title">
              Bez <em>ściemy</em>.<br />
              Po kolei.
            </span>
          }
          lead="Klienci wracają do nas z kolejnymi autami, bo wiedzą, czego się spodziewać. Tak to wygląda."
        />
        <ol className="steps">
          {processSteps.map((s, i) => (
            <Step key={s.title} i={i} {...s} />
          ))}
        </ol>
      </div>
    </section>
  );
}
