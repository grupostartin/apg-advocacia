import React from "react";
import { INFORMATIVE_ARTICLES, InformativeArticle } from "../data/legalData";

export type ScreenType = "home" | "privacidade" | "termos" | "informativo";

interface LegalPagesViewProps {
  screen: Exclude<ScreenType, "home">;
  onNavigateHome: (targetAnchor?: string) => void;
  onChangeScreen: (screen: ScreenType) => void;
  onSelectArticle: (article: InformativeArticle) => void;
}

export const LegalPagesView: React.FC<LegalPagesViewProps> = ({
  screen,
  onNavigateHome,
  onChangeScreen,
  onSelectArticle,
}) => {
  return (
    <div className="w-full min-h-screen pt-20 bg-surface">
      {/* Sub-header Institucional de Navegação */}
      <div className="bg-surface-charcoal border-b border-subtle">
        <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2 text-body-sm text-text-muted">
            <button
              type="button"
              onClick={() => onNavigateHome()}
              className="inline-flex items-center gap-1.5 text-gold-bright hover:text-text-primary transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Voltar ao Portal Principal</span>
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-text-primary">
              {screen === "privacidade" && "Política de Privacidade (LGPD)"}
              {screen === "termos" && "Termos de Uso & Aviso Regulatório"}
              {screen === "informativo" && "Publicações & Conteúdo Informativo"}
            </span>
          </div>

          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 max-w-full">
            <button
              type="button"
              onClick={() => onChangeScreen("informativo")}
              className={`px-space-sm py-1 rounded text-body-sm transition-colors cursor-pointer whitespace-nowrap ${
                screen === "informativo"
                  ? "bg-surface-coffee/40 text-gold-bright border border-subtle"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Artigos Informativos
            </button>
            <button
              type="button"
              onClick={() => onChangeScreen("privacidade")}
              className={`px-space-sm py-1 rounded text-body-sm transition-colors cursor-pointer whitespace-nowrap ${
                screen === "privacidade"
                  ? "bg-surface-coffee/40 text-gold-bright border border-subtle"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Privacidade (LGPD)
            </button>
            <button
              type="button"
              onClick={() => onChangeScreen("termos")}
              className={`px-space-sm py-1 rounded text-body-sm transition-colors cursor-pointer whitespace-nowrap ${
                screen === "termos"
                  ? "bg-surface-coffee/40 text-gold-bright border border-subtle"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo da Tela Selecionada */}
      <div className="max-w-5xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-2xl lg:py-space-3xl">
        {screen === "privacidade" && (
          <article className="space-y-space-xl">
            <header className="space-y-space-sm border-b border-subtle pb-space-lg">
              <div className="flex items-center gap-2 text-body-sm text-gold-bright">
                <span>Conformidade Legal</span>
                <span aria-hidden="true">·</span>
                <span>Lei nº 13.709/2018 (LGPD)</span>
                <span aria-hidden="true">·</span>
                <span>Atualizado em Outubro/2026</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                Política de Privacidade e Proteção de Dados
              </h1>
              <p className="font-body-lg text-body-lg text-text-muted font-light">
                Diretrizes de governança, sigilo profissional e tratamento de dados pessoais aplicáveis ao portal institucional da APG Advocacia.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              <div className="p-space-lg rounded bg-surface-card border border-subtle">
                <span className="font-label-caps text-label-caps text-gold-bright block mb-1">
                  Controladora
                </span>
                <p className="font-body-sm text-body-sm text-text-primary font-medium">
                  Ana Paula Gomes Sociedade Individual de Advocacia
                </p>
                <p className="font-legal-disclaimer text-legal-disclaimer text-text-muted mt-1">
                  Inscrição OAB/MG 000.000 · Belo Horizonte/MG
                </p>
              </div>
              <div className="p-space-lg rounded bg-surface-card border border-subtle">
                <span className="font-label-caps text-label-caps text-gold-bright block mb-1">
                  Finalidade Estrita
                </span>
                <p className="font-body-sm text-body-sm text-text-primary font-medium">
                  Retorno Institucional &amp; Sigilo
                </p>
                <p className="font-legal-disclaimer text-legal-disclaimer text-text-muted mt-1">
                  Vedado o compartilhamento comercial ou publicitário com terceiros.
                </p>
              </div>
              <div className="p-space-lg rounded bg-surface-card border border-subtle">
                <span className="font-label-caps text-label-caps text-gold-bright block mb-1">
                  Canal do Titular (DPO)
                </span>
                <p className="font-body-sm text-body-sm text-text-primary font-medium">
                  contato@apgadvocacia.com.br
                </p>
                <p className="font-legal-disclaimer text-legal-disclaimer text-text-muted mt-1">
                  Atendimento aos direitos previstos no art. 18 da LGPD.
                </p>
              </div>
            </div>

            <div className="p-space-xl rounded bg-surface-graphite border border-subtle space-y-space-lg text-text-muted leading-relaxed">
              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  1. Compromisso com o Sigilo e a Privacidade
                </h2>
                <p className="font-body-md text-body-md">
                  A <strong className="text-text-primary font-medium">APG Advocacia</strong> pauta sua atuação na observância intransigente do dever de sigilo profissional (arts. 35 a 38 do Código de Ética e Disciplina da OAB) e das disposições da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD). Esta Política descreve de forma clara e transparente como tratamos os dados fornecidos voluntariamente pelos usuários deste portal institucional.
                </p>
              </section>

              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  2. Dados Coletados e Finalidade do Tratamento
                </h2>
                <p className="font-body-md text-body-md">
                  Coletamos apenas os dados estritamente necessários quando o usuário preenche o formulário de contato institucional: Nome Completo, E-mail, Telefone/WhatsApp, Área de Interesse e o resumo da solicitação. Esses dados são tratados exclusivamente para:
                </p>
                <ul className="list-disc pl-5 space-y-1 font-body-sm text-body-sm text-text-muted">
                  <li>Responder às solicitações de contato e agendamento de consulta preliminar solicitadas pelo próprio titular;</li>
                  <li>Cumprir obrigações legais, regulatórias e deontológicas perante a Ordem dos Advogados do Brasil;</li>
                  <li>Garantir a segurança e a integridade técnica da navegação no portal institucional.</li>
                </ul>
              </section>

              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  3. Cookies e Tecnologias de Navegação
                </h2>
                <p className="font-body-md text-body-md">
                  Este portal utiliza cookies estritamente necessários para assegurar a estabilidade técnica da sessão e registrar sua preferência de consentimento. Eventuais métricas analíticas (como Google Analytics 4) somente são acionadas mediante o consentimento expresso do visitante, em estrita observância ao requisito RF09 de governança de privacidade.
                </p>
              </section>

              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  4. Direitos do Titular dos Dados
                </h2>
                <p className="font-body-md text-body-md">
                  Nos termos do artigo 18 da LGPD, o titular poderá, a qualquer momento e mediante requisição formal enviada ao correio eletrônico <span className="text-gold-bright">contato@apgadvocacia.com.br</span>, solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de informações incompletas ou a eliminação de dados desnecessários, ressalvadas as hipóteses legais de guarda obrigatória.
                </p>
              </section>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-lg rounded bg-surface-card border border-subtle">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-text-primary text-lg">
                  Deseja exercer seus direitos sob a LGPD?
                </h3>
                <p className="font-body-sm text-body-sm text-text-muted">
                  Utilize nossos canais institucionais para contatar o encarregado pelo tratamento de dados.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateHome("#contato")}
                className="px-space-lg py-2.5 rounded bg-primary-container text-on-primary-fixed font-label-md text-label-md hover:bg-gold-bright transition-colors cursor-pointer whitespace-nowrap"
              >
                Acessar Canal de Contato
              </button>
            </div>
          </article>
        )}

        {screen === "termos" && (
          <article className="space-y-space-xl">
            <header className="space-y-space-sm border-b border-subtle pb-space-lg">
              <div className="flex items-center gap-2 text-body-sm text-gold-bright">
                <span>Deontologia Jurídica</span>
                <span aria-hidden="true">·</span>
                <span>Provimento nº 205/2021 CFOAB</span>
                <span aria-hidden="true">·</span>
                <span>Código de Ética e Disciplina</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                Termos de Uso e Aviso Regulatório OAB
              </h1>
              <p className="font-body-lg text-body-lg text-text-muted font-light">
                Condições de acesso ao portal institucional e esclarecimentos éticos sobre o caráter informativo de seu conteúdo.
              </p>
            </header>

            <div className="p-space-xl rounded bg-surface-graphite border border-subtle space-y-space-lg text-text-muted leading-relaxed">
              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  1. Caráter Meramente Informativo (Provimento nº 205/2021)
                </h2>
                <p className="font-body-md text-body-md">
                  Todo o conteúdo disponibilizado neste portal eletrônico — incluindo descrições de áreas de atuação, textos explicativos, artigos e respostas a dúvidas frequentes — possui finalidade exclusivamente informativa e educativa, em estrita conformidade com o Provimento nº 205/2021 do Conselho Federal da Ordem dos Advogados do Brasil (CFOAB) e com a Lei nº 8.906/1994.
                </p>
              </section>

              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  2. Ausência de Consultoria Automática ou Promessa de Resultado
                </h2>
                <p className="font-body-md text-body-md">
                  As informações aqui apresentadas não constituem parecer legal, orientação jurídica para casos concretos nem promessa ou garantia de resultado processual. A advocacia é atividade de meio, pautada pela diligência técnica, ética e independência profissional.
                </p>
              </section>

              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  3. Formalização da Relação Advogado-Cliente
                </h2>
                <p className="font-body-md text-body-md">
                  O simples envio de mensagem através do formulário de contato ou canal de comunicação instantânea (WhatsApp) não estabelece, por si só, vínculo contratual de mandato judicial ou consultivo. A constituição formal da representação jurídica depende de análise prévia de conflito de interesses e da celebração de Contrato de Prestação de Serviços Advocatícios e respectiva Procuração.
                </p>
              </section>

              <section className="space-y-space-xs">
                <h2 className="font-headline-sm text-headline-sm text-text-primary">
                  4. Propriedade Intelectual
                </h2>
                <p className="font-body-md text-body-md">
                  Os textos, elementos gráficos, identidade visual e estrutura editorial deste portal pertencem à <strong className="text-text-primary font-medium">Ana Paula Gomes Sociedade Individual de Advocacia</strong>, sendo vedada a reprodução comercial desautorizada.
                </p>
              </section>
            </div>
          </article>
        )}

        {screen === "informativo" && (
          <div className="space-y-space-xl">
            <header className="space-y-space-sm border-b border-subtle pb-space-lg">
              <div className="flex items-center gap-2 text-body-sm text-gold-bright">
                <span>Conteúdo Educativo</span>
                <span aria-hidden="true">·</span>
                <span>Publicidade Informativa OAB</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                Publicações e Artigos Informativos
              </h1>
              <p className="font-body-lg text-body-lg text-text-muted font-light max-w-3xl">
                Análises jurídicas de caráter estritamente educativo sobre temas relevantes em Direito Civil, Imobiliário, Família, Sucessões e Empresarial.
              </p>
            </header>

            <div className="grid grid-cols-1 gap-space-lg">
              {INFORMATIVE_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="p-space-xl rounded bg-surface-card border border-subtle hover:border-gold-bright transition-colors flex flex-col justify-between gap-space-md"
                >
                  <div className="space-y-space-sm">
                    <div className="flex items-center gap-2 text-body-sm text-gold-bright">
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-text-muted">{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-text-muted">{article.readTime}</span>
                    </div>
                    <h2 className="font-headline-md text-headline-sm md:text-headline-md text-text-primary">
                      {article.title}
                    </h2>
                    <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-space-md border-t border-subtle/50 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                    <span className="font-legal-disclaimer text-legal-disclaimer text-text-muted">
                      {article.legalReference}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="inline-flex items-center gap-1.5 text-body-sm text-gold-bright hover:text-text-primary transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
                    >
                      <span>Ler artigo completo</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
