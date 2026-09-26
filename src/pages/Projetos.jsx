import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, startPageMotion } from "../motion";
import { Chrome, Footer, Menu, Nav, whatsappLink } from "../components/Layout.jsx";
import Cover, { CoverDefs } from "../components/Cover.jsx";
import { PROJETOS, TIPOS, numeroDo } from "../data/projetos.js";

const MENU = [
  ["/#manifesto", "Agência"],
  ["/#servicos", "Serviços"],
  ["#topo", "Projetos"],
  ["/#metodo", "Método"],
  ["/#contato", "Contato"],
];

const FILTROS = [["todos", "Todos"], ...Object.entries(TIPOS)];

function slugFromHash() {
  const slug = decodeURIComponent(location.hash.replace(/^#/, ""));
  return PROJETOS.some((p) => p.slug === slug) ? slug : null;
}

function ProjectCard({ projeto, onOpen }) {
  const live = Boolean(projeto.url);
  const caseHref = `#${projeto.slug}`;

  return (
    <li className="pcard">
      {live ? (
        <a className="pcard__media" href={projeto.url} target="_blank" rel="noreferrer">
          <Cover projeto={projeto} />
          <span className="pcard__open" aria-hidden="true">
            Abrir o site <i />
          </span>
        </a>
      ) : (
        <a className="pcard__media" href={caseHref} onClick={(event) => onOpen(event, projeto.slug)}>
          <Cover projeto={projeto} />
          <span className="pcard__open" aria-hidden="true">
            Ver case <i />
          </span>
        </a>
      )}
      <div className="pcard__meta">
        <span className="pcard__num">{numeroDo(projeto)}</span>
        <span>{TIPOS[projeto.tipo]}</span>
        <span>{projeto.ano}</span>
        {projeto.exemplo && <em className="tag-exemplo">Exemplo</em>}
      </div>
      <h3>
        <a href={live ? projeto.url : caseHref} {...(live ? { target: "_blank", rel: "noreferrer" } : { onClick: (event) => onOpen(event, projeto.slug) })}>
          {projeto.titulo}
        </a>
      </h3>
      <p className="pcard__seg">{projeto.segmento}</p>
      <p className="pcard__text">{projeto.resumo}</p>
      {live && (
        <a className="pcard__link" href={projeto.url} target="_blank" rel="noreferrer">
          {projeto.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </a>
      )}
    </li>
  );
}

function CaseView({ projeto, open, onClose, onNext }) {
  const scroller = useRef(null);

  useEffect(() => {
    if (open && scroller.current) scroller.current.scrollTop = 0;
  }, [open, projeto]);

  if (!projeto) return <div className="case" aria-hidden="true" />;

  const index = PROJETOS.indexOf(projeto);
  const next = PROJETOS[(index + 1) % PROJETOS.length];
  const mensagem = `Olá! Vi o projeto "${projeto.titulo}" no site da SHINKA e tenho um problema parecido na minha empresa.`;

  return (
    <div className={`case${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open} aria-label={projeto.titulo}>
      <div className="case__bg" />
      <div className="case__scroll" ref={scroller} data-lenis-prevent>
        <div className="case__bar">
          <button type="button" className="case__back" onClick={onClose}>
            <i aria-hidden="true" /> Todos os projetos
          </button>
          <span className="case__count">
            {numeroDo(projeto)} / {String(PROJETOS.length).padStart(2, "0")}
          </span>
          <button type="button" className="case__close" onClick={onClose} aria-label="Fechar">
            <span />
            <span />
          </button>
        </div>

        <article className="case__body" key={projeto.slug}>
          <header className="case__head">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              {TIPOS[projeto.tipo].toUpperCase()} — {projeto.ano}
              {projeto.exemplo && <em className="tag-exemplo">Exemplo</em>}
            </p>
            <h2>{projeto.titulo}</h2>
            <p className="case__seg">{projeto.segmento}</p>
            <p className="case__lead">{projeto.resumo}</p>
          </header>

          <Cover projeto={projeto} className="case__cover" />

          <div className="case__story">
            <section>
              <span>01</span>
              <h3>O problema</h3>
              <p>{projeto.problema}</p>
            </section>
            <section>
              <span>02</span>
              <h3>O que a gente fez</h3>
              <p>{projeto.solucao}</p>
            </section>
          </div>

          <section className="case__results">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              03 — RESULTADO
            </p>
            <ul>
              {projeto.resultados.map((r) => (
                <li key={r.label}>
                  <b>{r.valor}</b>
                  <span>{r.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <ul className="case__stack">
            {projeto.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="case__cta">
            <div>
              <h3>Tem um problema parecido?</h3>
              <p>Conta como está hoje. A gente responde com o que dá para automatizar agora.</p>
            </div>
            <div className="case__cta-actions">
              {projeto.url && (
                <a className="btn btn--ghost" href={projeto.url} target="_blank" rel="noreferrer">
                  <span>Abrir o site</span>
                </a>
              )}
              <a className="btn btn--fill" href={whatsappLink(mensagem)} target="_blank" rel="noreferrer">
                <span>Falar no WhatsApp</span>
                <i />
              </a>
            </div>
          </div>

          <button type="button" className="case__next" onClick={() => onNext(next.slug)}>
            <span>Próximo projeto</span>
            <b>{next.titulo}</b>
            <i aria-hidden="true" />
          </button>
        </article>
      </div>
    </div>
  );
}

export default function Projetos() {
  const [filtro, setFiltro] = useState("todos");
  const [slug, setSlug] = useState(() => slugFromHash());
  const [lastSlug, setLastSlug] = useState(slug);
  const openedHere = useRef(false);
  const grid = useRef(null);

  useEffect(() => startPageMotion(), []);

  // Abre/fecha o case de acordo com o #slug da URL (permite compartilhar o link e usar o "voltar").
  useEffect(() => {
    const onHash = () => {
      const next = slugFromHash();
      setSlug(next);
      if (!next) openedHere.current = false;
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (slug) setLastSlug(slug);
    const lenis = getLenis();
    document.body.classList.toggle("case-open", Boolean(slug));
    if (slug) lenis?.stop();
    else lenis?.start();

    const onKey = (event) => {
      if (event.key === "Escape" && slug) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug]);

  const lista = useMemo(
    () => (filtro === "todos" ? PROJETOS : PROJETOS.filter((p) => p.tipo === filtro)),
    [filtro],
  );

  useEffect(() => {
    const cards = grid.current?.querySelectorAll(".pcard");
    if (!cards?.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(cards, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out" });
    ScrollTrigger.refresh();
  }, [filtro]);

  function open(event, target) {
    event?.preventDefault();
    openedHere.current = true;
    location.hash = target;
  }

  function close() {
    if (openedHere.current) {
      history.back();
    } else {
      history.replaceState(null, "", location.pathname + location.search);
      setSlug(null);
    }
  }

  function goNext(target) {
    history.replaceState(null, "", `#${target}`);
    setSlug(target);
  }

  const contagem = (tipo) => (tipo === "todos" ? PROJETOS.length : PROJETOS.filter((p) => p.tipo === tipo).length);
  const projetoAberto = PROJETOS.find((p) => p.slug === (slug ?? lastSlug));

  return (
    <>
      <Chrome />
      <CoverDefs />
      <Nav home="/" />
      <Menu links={MENU} />

      <main id="topo">
        <section className="phero">
          <div className="hero__grid" aria-hidden="true" />
          <p className="phero__kanji" aria-hidden="true">
            作品
          </p>
          <div className="phero__top" data-intro>
            <a className="phero__crumb" href="/">
              <i aria-hidden="true" /> Início
            </a>
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              PORTFÓLIO — 作品
            </p>
          </div>
          <h1 className="phero__title" data-split>
            PROJETO<b>S</b>
          </h1>
          <div className="phero__bottom">
            <p className="phero__lead" data-intro>
              Problemas reais de operação que a equipe SHINKA transformou em sistema. Cada case mostra o antes, o que
              foi feito e o que mudou.
            </p>
            <p className="phero__count" data-intro>
              <b>{String(PROJETOS.length).padStart(2, "0")}</b>
              <span>projetos</span>
            </p>
          </div>
        </section>

        <section className="pwork">
          <div className="filters" role="tablist" aria-label="Filtrar projetos" data-intro>
            {FILTROS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={filtro === key}
                className={filtro === key ? "is-on" : ""}
                onClick={() => setFiltro(key)}
              >
                {label}
                <sup>{String(contagem(key)).padStart(2, "0")}</sup>
              </button>
            ))}
          </div>

          <ul className="pgrid" ref={grid}>
            {lista.map((projeto) => (
              <ProjectCard key={projeto.slug} projeto={projeto} onOpen={open} />
            ))}
          </ul>
        </section>

        <section className="cta pcta" data-reveal>
          <p className="cta__kanji" aria-hidden="true">
            進化
          </p>
          <p className="eyebrow">
            <span className="eyebrow__dot" />
            PRÓXIMO PASSO
          </p>
          <h2 className="cta__title">
            O próximo case
            <br />
            pode ser o seu.
          </h2>
          <p className="cta__lead">Conta o que trava a operação. A gente responde com um recorte honesto e o caminho.</p>
          <div className="hero__actions pcta__actions">
            <a className="btn btn--fill" href={whatsappLink("Olá! Vi os projetos da SHINKA e quero conversar sobre a minha operação.")} target="_blank" rel="noreferrer" data-magnetic>
              <span>Falar no WhatsApp</span>
              <i />
            </a>
            <a className="btn btn--ghost" href="/#contato" data-magnetic>
              <span>Voltar ao site</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <CaseView projeto={projetoAberto} open={Boolean(slug)} onClose={close} onNext={goNext} />
    </>
  );
}
