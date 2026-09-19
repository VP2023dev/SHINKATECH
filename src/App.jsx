import { useEffect, useState } from "react";
import { startMotion } from "./motion";

const MARQUEE = ["AUTOMAÇÃO", "PROCESSOS", "SISTEMAS", "INTEGRAÇÃO", "EVOLUÇÃO"];

const SERVICES = [
  {
    num: "01",
    title: "Processos internos",
    text: "Tarefas repetidas, aprovações, controle e rotina que ainda passam de pessoa em pessoa. A gente vira isso em fluxo.",
    tags: ["Rotina", "Aprovações", "Controle"],
  },
  {
    num: "02",
    title: "Sistemas sob medida",
    text: "Quando a planilha já não segura. Um sistema simples, do tamanho do problema, sem ferramenta genérica empurrada.",
    tags: ["Painéis", "Cadastros", "Operação"],
  },
  {
    num: "03",
    title: "Integração",
    text: "WhatsApp, ERP, planilha, e-mail e o sistema que vocês já usam falando a mesma língua. Menos copia e cola.",
    tags: ["APIs", "Dados", "Conectores"],
  },
  {
    num: "04",
    title: "Problema da empresa",
    text: "Chega com a dor. A gente recorta o que dá para automatizar agora e o que pode esperar. Sem teatro e sem ferramenta empurrada.",
    tags: ["Diagnóstico", "Prioridade", "Entrega"],
  },
];

const METHOD = [
  ["01", "Descobrir", "Onde a operação trava, quanto tempo some e o que vale automatizar primeiro."],
  ["02", "Desenhar", "O fluxo certo antes do sistema. Simples, claro, no tamanho do problema."],
  ["03", "Construir", "Entrega curta e objetiva. Você acompanha o sistema, não só um slide."],
  ["04", "Evoluir", "Medir o ganho, ajustar e crescer. Automação que acompanha a empresa."],
];

const WHATSAPP = "5517974007400";

function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();
    const text = `Olá, sou ${nome}.\nE-mail: ${email}\n\n${mensagem}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return <p className="form__ok">Abrimos o WhatsApp com a sua mensagem.</p>;
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="field">
        <input type="text" name="nome" required placeholder=" " />
        <span>Nome</span>
      </label>
      <label className="field">
        <input type="email" name="email" required placeholder=" " />
        <span>E-mail</span>
      </label>
      <label className="field form__full">
        <textarea name="mensagem" rows="4" required placeholder=" " />
        <span>Qual problema você quer resolver</span>
      </label>
      <button className="btn btn--fill" type="submit" data-magnetic>
        <span>Enviar no WhatsApp</span>
        <i />
      </button>
    </form>
  );
}

export default function App() {
  useEffect(() => startMotion(), []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="scan" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div className="progress" aria-hidden="true">
        <span className="progress__bar" />
      </div>

      <div className="loader" aria-hidden="true">
        <div className="loader__veil" />
        <div className="loader__flash" />
        <div className="loader__inner">
          <p className="loader__kanji">
            <span>進</span>
            <span>化</span>
          </p>
          <p className="loader__word">
            SHINK<span>A</span>
          </p>
          <div className="loader__row">
            <span className="loader__count">00</span>
            <span className="loader__line">
              <i />
            </span>
            <span className="loader__tag">進化</span>
          </div>
        </div>
      </div>

      <header className="nav">
        <a className="nav__brand" href="#topo" data-magnetic>
          <span className="wordmark">
            SHINK<span>A</span>
          </span>
        </a>
        <p className="nav__meta">進化</p>
        <button className="nav__toggle" type="button" aria-label="Abrir menu" data-magnetic>
          <span />
          <span />
        </button>
      </header>

      <nav className="menu" aria-hidden="true">
        <div className="menu__bg" />
        <div className="menu__inner">
          <p className="menu__label">Navegar</p>
          <ul className="menu__list">
            <li>
              <a href="#manifesto" data-index="01">
                Agência
              </a>
            </li>
            <li>
              <a href="#servicos" data-index="02">
                Serviços
              </a>
            </li>
            <li>
              <a href="#metodo" data-index="03">
                Método
              </a>
            </li>
            <li>
              <a href="#contato" data-index="04">
                Contato
              </a>
            </li>
          </ul>
          <div className="menu__foot">
            <p>進化</p>
          </div>
        </div>
      </nav>

      <main id="topo">
        <section className="hero">
          <canvas className="hero__canvas" aria-hidden="true" />
          <div className="hero__grid" aria-hidden="true" />
          <div className="hero__glow" aria-hidden="true" />
          <span className="hero__slash" aria-hidden="true" />

          <div className="hero__top">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              進化
            </p>
          </div>

          <h1 className="hero__title">
            <span className="line">
              SHINK<b>A</b>
            </span>
          </h1>

          <div className="hero__kanji" aria-hidden="true">
            進化
          </div>

          <div className="hero__bottom">
            <p className="hero__lead lede">
              Agência de automação para empresas. A gente entra no problema da operação e constrói o sistema que tira
              retrabalho do caminho.
            </p>
            <div className="hero__actions">
              <a className="btn btn--fill" href="#contato" data-magnetic>
                <span>Iniciar projeto</span>
                <i />
              </a>
              <a className="btn btn--ghost" href="#servicos" data-magnetic>
                <span>Ver o que fazemos</span>
              </a>
            </div>
          </div>

          <a className="hero__scroll" href="#manifesto">
            <span>SCROLL</span>
            <b />
          </a>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <div className="marquee__group" key={copy}>
                {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, index) => (
                  <span key={`${copy}-${item}-${index}`}>
                    {item}
                    <i />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="manifesto" id="manifesto">
          <div className="manifesto__head">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              <span className="eyebrow__idx">01</span>
              <span className="eyebrow__line" />
              <span>A agência</span>
            </p>
            <p className="kanji-label">
              <span>進</span>
              <span>化</span>
            </p>
          </div>

          <h2 className="display manifesto__title">
            A tecnologia que não evolui
            <em>morre em silêncio.</em>
          </h2>

          <div className="manifesto__grid">
            <p className="manifesto__lead lede">
              SHINKA vem do ideograma japonês <strong>進化</strong> — evolução. Somos uma agência de automação para
              empresas. Entramos no problema da operação e construímos o sistema que tira retrabalho do caminho.
            </p>
            <div className="manifesto__focus">
              <article>
                <h3>Operação</h3>
                <p>Processos manuais, planilha e retrabalho que comem o dia.</p>
              </article>
              <article>
                <h3>Sistema</h3>
                <p>Software sob medida para o jeito que a empresa já trabalha.</p>
              </article>
              <article>
                <h3>Evolução</h3>
                <p>Medir o que muda e crescer junto com o negócio.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="services" id="servicos">
          <div className="services__sticky">
            <div className="section-head services__head">
              <p className="eyebrow">
                <span className="eyebrow__dot" />
                <span className="eyebrow__idx">02</span>
                <span className="eyebrow__line" />
                <span>O que fazemos</span>
              </p>
              <h2 className="display">
                O que a gente
                <em>automatiza.</em>
              </h2>
            </div>

            <div className="services__track" data-horizontal>
              {SERVICES.map((item) => (
                <article className="card" key={item.num}>
                  <span className="card__num">{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="method" id="metodo">
          <div className="section-head method__head">
            <p className="eyebrow">
              <span className="eyebrow__dot" />
              <span className="eyebrow__idx">03</span>
              <span className="eyebrow__line" />
              <span>Método</span>
            </p>
            <h2 className="display">
              Quatro atos.
              <em>Zero improviso.</em>
            </h2>
          </div>

          <ol className="method__list">
            {METHOD.map(([num, title, text]) => (
              <li key={num}>
                <span>{num}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="cta" id="contato">
          <p className="cta__kanji" aria-hidden="true">
            進化
          </p>
          <p className="eyebrow">
            <span className="eyebrow__dot" />
            <span className="eyebrow__idx">04</span>
            <span className="eyebrow__line" />
            <span>Próximo passo</span>
          </p>
          <h2 className="display cta__title">
            Conta o problema.
            <em>A gente automatiza.</em>
          </h2>
          <p className="cta__lead lede">
            Escreve o que trava a operação. A gente responde com um recorte honesto: o que dá para automatizar agora e o
            caminho.
          </p>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <p className="footer__mark">
          SHINK<span>A</span>
        </p>
        <div className="footer__row">
          <p>進化</p>
          <p>© 2026 SHINKA</p>
        </div>
      </footer>
    </>
  );
}
