import React from "react";
import { HTML_IMAGES, InformativeArticle, PracticeArea } from "../data/legalData";

interface PracticeAreaModalProps {
  selectedArea: PracticeArea | null;
  selectedArticle: InformativeArticle | null;
  showLawyerProfile: boolean;
  onClose: () => void;
  onConsultArea: (formValue: string) => void;
}

export const PracticeAreaModal: React.FC<PracticeAreaModalProps> = ({
  selectedArea,
  selectedArticle,
  showLawyerProfile,
  onClose,
  onConsultArea,
}) => {
  if (!selectedArea && !selectedArticle && !showLawyerProfile) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-sm sm:p-space-md bg-surface-charcoal/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-surface-card border border-subtle shadow-2xl p-3 sm:p-space-lg md:p-space-xl text-on-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal de Área de Atuação */}
        {selectedArea && (
          <div className="space-y-space-lg">
            <div className="flex items-start justify-between gap-space-md border-b border-subtle pb-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-label-caps font-label-caps text-gold-bright uppercase">
                  <span>{selectedArea.code}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArea.footerLabel}</span>
                </div>
                <h2 className="font-headline-md text-headline-sm sm:text-headline-md text-text-primary">
                  {selectedArea.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar janela informativa"
                className="p-1.5 rounded bg-surface-graphite border border-subtle text-text-muted hover:text-gold-bright transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl block">close</span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-text-muted leading-relaxed">
              {selectedArea.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="p-space-md rounded bg-surface-graphite border border-subtle space-y-space-sm">
                <div className="flex items-center gap-2 text-gold-bright">
                  <span className="material-symbols-outlined text-lg">shield</span>
                  <h3 className="font-label-md text-label-md text-text-primary font-semibold">
                    Atuação Consultiva &amp; Preventiva
                  </h3>
                </div>
                <ul className="space-y-2 text-body-sm text-text-muted">
                  {selectedArea.preventiveScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold-aged mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-space-md rounded bg-surface-graphite border border-subtle space-y-space-sm">
                <div className="flex items-center gap-2 text-gold-bright">
                  <span className="material-symbols-outlined text-lg">balance</span>
                  <h3 className="font-label-md text-label-md text-text-primary font-semibold">
                    Contencioso Estratégico
                  </h3>
                </div>
                <ul className="space-y-2 text-body-sm text-text-muted">
                  {selectedArea.contentiousScope.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold-aged mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dúvidas Frequentes Educativas */}
            <div className="space-y-space-sm pt-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-text-primary text-lg">
                Esclarecimentos Educativos (FAQ)
              </h3>
              <div className="space-y-space-sm">
                {selectedArea.faq.map((faqItem, idx) => (
                  <div
                    key={idx}
                    className="p-space-md rounded bg-surface-charcoal/80 border border-subtle/60 space-y-1"
                  >
                    <h4 className="font-label-md text-label-md text-gold-bright font-medium">
                      {faqItem.question}
                    </h4>
                    <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                      {faqItem.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-space-md border-t border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
              <span className="font-legal-disclaimer text-legal-disclaimer text-text-muted">
                Conteúdo meramente informativo (Provimento nº 205/2021 CFOAB).
              </span>
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-space-md py-2.5 rounded border border-subtle text-text-muted hover:text-text-primary font-label-md text-label-md transition-colors cursor-pointer whitespace-nowrap"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={() => onConsultArea(selectedArea.formValue)}
                  className="px-space-lg py-2.5 rounded bg-gradient-to-r from-gold-aged to-primary-container text-surface-charcoal font-label-md text-label-md font-semibold uppercase tracking-wider hover:from-gold-bright hover:to-gold-aged transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <span>Solicitar Atendimento nesta Área</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Leitura de Artigo Informativo */}
        {selectedArticle && (
          <div className="space-y-space-lg">
            <div className="flex items-start justify-between gap-space-md border-b border-subtle pb-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-body-sm text-gold-bright">
                  <span>{selectedArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-text-muted">{selectedArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-text-muted">{selectedArticle.readTime}</span>
                </div>
                <h2 className="font-headline-md text-headline-sm sm:text-headline-md text-text-primary">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar artigo"
                className="p-1.5 rounded bg-surface-graphite border border-subtle text-text-muted hover:text-gold-bright transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl block">close</span>
              </button>
            </div>

            <div className="space-y-space-md text-text-muted leading-relaxed font-body-md text-body-md">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="p-space-md rounded bg-surface-graphite border border-subtle space-y-1">
              <span className="font-label-caps text-label-caps text-gold-bright uppercase block">
                Fundamentação Normativa
              </span>
              <p className="font-body-sm text-body-sm text-text-muted">
                {selectedArticle.legalReference}
              </p>
            </div>

            <div className="pt-space-md border-t border-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm">
              <span className="font-legal-disclaimer text-legal-disclaimer text-text-muted">
                Autoria: Dra. Ana Paula Gonçalves (OAB/MG 000.000) · Caráter educativo.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-space-lg py-2 rounded bg-primary-container text-on-primary-fixed font-label-md text-label-md hover:bg-gold-bright transition-colors cursor-pointer whitespace-nowrap"
              >
                Concluir Leitura
              </button>
            </div>
          </div>
        )}

        {/* Modal de Perfil Institucional da Advogada Titular */}
        {showLawyerProfile && (
          <div className="space-y-space-lg">
            <div className="flex items-start justify-between gap-space-md border-b border-subtle pb-space-md">
              <div className="flex items-center gap-space-md">
                <img
                  src={HTML_IMAGES.lawyerPortrait}
                  alt="Dra. Ana Paula Gonçalves"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded object-cover object-top border border-subtle"
                />
                <div>
                  <span className="font-label-caps text-label-caps text-gold-bright uppercase block">
                    Sócia Titular &amp; Fundadora
                  </span>
                  <h2 className="font-headline-md text-headline-sm sm:text-headline-md text-text-primary">
                    Dra. Ana Paula Gonçalves
                  </h2>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    Inscrição Regular OAB/MG 000.000 · Belo Horizonte/MG
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar credenciais"
                className="p-1.5 rounded bg-surface-graphite border border-subtle text-text-muted hover:text-gold-bright transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl block">close</span>
              </button>
            </div>

            <div className="space-y-space-md font-body-md text-body-md text-text-muted leading-relaxed">
              <p>
                Advogada e Consultora Jurídica com atuação dedicada ao Direito Civil, Empresarial, Imobiliário e Direito das Famílias e Sucessões em Belo Horizonte/MG e em âmbito nacional. Fundadora da <strong className="text-text-primary font-medium">Ana Paula Gonçalves Sociedade Individual de Advocacia</strong>, conduz pessoalmente o planejamento estratégico de cada demanda confiada ao escritório.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                <div className="p-space-md rounded bg-surface-graphite border border-subtle">
                  <span className="font-label-caps text-label-caps text-gold-bright uppercase block mb-1">
                    Formação &amp; Pesquisa
                  </span>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    Especialização em Direito Contratual, Direito de Família e Sucessões e Gestão Estratégica de Conflitos Empresariais.
                  </p>
                </div>
                <div className="p-space-md rounded bg-surface-graphite border border-subtle">
                  <span className="font-label-caps text-label-caps text-gold-bright uppercase block mb-1">
                    Registro Societário
                  </span>
                  <p className="font-body-sm text-body-sm text-text-muted">
                    Sociedade Individual de Advocacia regularmente inscrita na Ordem dos Advogados do Brasil — Seccional Minas Gerais (OAB/MG).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-space-md border-t border-subtle flex justify-end gap-space-sm">
              <button
                type="button"
                onClick={onClose}
                className="px-space-md py-2 rounded border border-subtle text-text-muted hover:text-text-primary font-label-md text-label-md transition-colors cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => onConsultArea("civil")}
                className="px-space-lg py-2 rounded bg-primary-container text-on-primary-fixed font-label-md text-label-md hover:bg-gold-bright transition-colors cursor-pointer"
              >
                Entrar em Contato
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
