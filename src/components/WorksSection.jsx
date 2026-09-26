import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Cover, { CoverDefs } from "./Cover.jsx";
import { DESTAQUES, PROJETOS, TIPOS, numeroDo } from "../data/projetos.js";

// Seção "Projetos" da página inicial: lista dos destaques com uma prévia
// da capa que acompanha o mouse (no celular a capa aparece dentro da linha).
export default function WorksSection({ number = "03" }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const preview = useRef(null);

  useEffect(() => {
    const el = preview.current;
    if (!el || matchMedia("(pointer: coarse)").matches) return undefined;
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const onMove = (event) => {
      x(event.clientX);
      y(event.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="works" id="projetos">
      <CoverDefs />
      <div className="works__head">
        <div>
          <p className="eyebrow">
            <span className="eyebrow__dot" />
            {number} — PROJETOS
          </p>
          <h2>
            O que já está
            <br />
            <em>rodando.</em>
          </h2>
        </div>
        <p className="works__lead">
          Alguns sistemas que a equipe SHINKA colocou em produção. Cada um nasceu de um problema real de operação.
        </p>
      </div>

      <ul className="works__list" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
        {DESTAQUES.map((projeto, index) => (
          <li key={projeto.slug}>
            <a
              className="works__row"
              href={projeto.url || `/projetos/#${projeto.slug}`}
              {...(projeto.url ? { target: "_blank", rel: "noreferrer" } : {})}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="works__num">{numeroDo(projeto)}</span>
              <span className="works__title">
                <b>{projeto.titulo}</b>
                <small>
                  {projeto.segmento}
                  {projeto.exemplo && <em className="tag-exemplo">Exemplo</em>}
                </small>
              </span>
              <span className="works__type">{TIPOS[projeto.tipo]}</span>
              <span className="works__year">{projeto.ano}</span>
              <i className="works__arrow" aria-hidden="true" />
              <Cover projeto={projeto} className="works__thumb" />
            </a>
          </li>
        ))}
      </ul>

      <div className={`works__preview${visible ? " is-on" : ""}`} ref={preview} aria-hidden="true">
        <div className="works__preview-inner">
          <div className="works__preview-track" style={{ transform: `translateY(${-active * 100}%)` }}>
            {DESTAQUES.map((projeto) => (
              <Cover key={projeto.slug} projeto={projeto} />
            ))}
          </div>
        </div>
      </div>

      <div className="works__foot">
        <a className="btn btn--fill" href="/projetos/" data-magnetic>
          <span>Ver todos os projetos ({String(PROJETOS.length).padStart(2, "0")})</span>
          <i />
        </a>
      </div>
    </section>
  );
}
