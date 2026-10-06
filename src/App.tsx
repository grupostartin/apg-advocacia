/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { LegalPagesView, ScreenType } from "./components/LegalPagesView";
import { PracticeAreaModal } from "./components/PracticeAreaModal";
import {
  HTML_IMAGES,
  InformativeArticle,
  PRACTICE_AREAS,
  PracticeArea,
} from "./data/legalData";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [activeNav, setActiveNav] = useState<string>("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [cookieConsentDismissed, setCookieConsentDismissed] =
    useState<boolean>(false);

  // Modal states
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [selectedArticle, setSelectedArticle] =
    useState<InformativeArticle | null>(null);
  const [showLawyerProfile, setShowLawyerProfile] = useState<boolean>(false);

  // Interactive map toggle
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

  // Contact form state
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    area: "civil",
    mensagem: "",
    lgpd: false,
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [protocolNumber, setProtocolNumber] = useState<string>("");
  const heroGradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate words
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });

    // Mouse gradient
    const gradient = heroGradientRef.current;
    const heroSection = document.getElementById("inicio");

    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }

    if (heroSection) {
      heroSection.addEventListener("mousemove", onMouseMove);
      heroSection.addEventListener("mouseleave", onMouseLeave);
    }

    // Word hover effects with golden glow
    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(212, 181, 114, 0.6)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });

    // Click ripple effect
    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.background = "rgba(212, 181, 114, 0.7)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "9999";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }

    if (heroSection) {
      heroSection.addEventListener("click", onClick);
    }

    // Floating elements on scroll
    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll<HTMLElement>(".floating-element").forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = "running";
          }, index * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      if (heroSection) {
        heroSection.removeEventListener("mousemove", onMouseMove);
        heroSection.removeEventListener("mouseleave", onMouseLeave);
        heroSection.removeEventListener("click", onClick);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [currentScreen]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleNavigateSection = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string,
    navKey?: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (navKey) {
      setActiveNav(navKey);
    }

    if (currentScreen !== "home") {
      setCurrentScreen("home");
      setTimeout(() => {
        if (sectionId === "#" || sectionId === "#inicio") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.querySelector(sectionId);
          el?.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
      return;
    }

    if (sectionId === "#" || sectionId === "#inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetId =
        sectionId === "#areas-de-atuacao" ? "#areas" : sectionId;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleOpenScreen = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    screen: ScreenType
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConsultArea = (formValue: string) => {
    setSelectedArea(null);
    setSelectedArticle(null);
    setShowLawyerProfile(false);
    setFormData((prev) => ({ ...prev, area: formValue }));
    if (currentScreen !== "home") {
      setCurrentScreen("home");
    }
    setTimeout(() => {
      const contactEl = document.getElementById("contato");
      contactEl?.scrollIntoView({ behavior: "smooth" });
      const nomeInput = document.getElementById("nome");
      nomeInput?.focus();
    }, 80);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    setProtocolNumber(`APG-2026-${randomDigits}`);
    setFormSubmitted(true);
  };

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(
      "Av. do Contorno, 6594, Conj. 142 - Savassi, Belo Horizonte - MG, CEP 30110-044"
    );
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-gold-aged selection:text-surface-charcoal">
      {/* HEADER FIXO */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-charcoal/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-subtle/40 animate-fade-in-down">
        <div className="h-20 max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <a
              className="flex items-center gap-space-sm"
              data-path="inicio"
              href="#inicio"
              onClick={(e) => handleNavigateSection(e, "#inicio", "inicio")}
            >
              <img
                alt="Logo APG Advocacia"
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
                src={HTML_IMAGES.logo}
              />
              <span className="font-headline-sm text-headline-sm text-text-primary tracking-tight hidden sm:inline-block whitespace-nowrap">
                APG Advocacia
              </span>
            </a>
            <div className="hidden xl:flex items-center pl-space-sm">
              <span className="px-space-sm py-0.5 rounded font-label-caps text-label-caps text-gold-bright bg-surface-coffee/25 border border-subtle whitespace-nowrap">
                OAB/MG 000.000
              </span>
            </div>
          </div>

          <nav
            className="hidden lg:flex items-center gap-space-lg"
            data-active-classes="text-gold-bright font-medium"
          >
            <a
              aria-current={
                currentScreen === "home" && activeNav === "inicio"
                  ? "page"
                  : undefined
              }
              className={`transition-colors whitespace-nowrap ${
                currentScreen === "home" && activeNav === "inicio"
                  ? "text-gold-bright font-medium"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
              }`}
              data-path="inicio"
              href="#inicio"
              onClick={(e) => handleNavigateSection(e, "#inicio", "inicio")}
            >
              Início
            </a>
            <a
              className={`transition-colors whitespace-nowrap ${
                currentScreen === "home" && activeNav === "sobre"
                  ? "text-gold-bright font-medium"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
              }`}
              data-path="sobre"
              href="#sobre"
              onClick={(e) => handleNavigateSection(e, "#sobre", "sobre")}
            >
              Sobre
            </a>
            <a
              className={`transition-colors whitespace-nowrap ${
                currentScreen === "home" && activeNav === "areas-de-atuacao"
                  ? "text-gold-bright font-medium"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
              }`}
              data-path="areas-de-atuacao"
              href="#areas"
              onClick={(e) =>
                handleNavigateSection(e, "#areas", "areas-de-atuacao")
              }
            >
              Áreas de Atuação
            </a>
            <a
              className={`transition-colors whitespace-nowrap ${
                currentScreen === "home" && activeNav === "como-atuamos"
                  ? "text-gold-bright font-medium"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
              }`}
              data-path="como-atuamos"
              href="#como-atuamos"
              onClick={(e) =>
                handleNavigateSection(e, "#como-atuamos", "como-atuamos")
              }
            >
              Como Atuamos
            </a>
            <a
              className={`transition-colors whitespace-nowrap ${
                currentScreen === "home" && activeNav === "valores"
                  ? "text-gold-bright font-medium"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
              }`}
              data-path="valores"
              href="#valores"
              onClick={(e) => handleNavigateSection(e, "#valores", "valores")}
            >
              Valores
            </a>
            <a
              className={`transition-colors whitespace-nowrap ${
                currentScreen === "home" && activeNav === "contato"
                  ? "text-gold-bright font-medium"
                  : "font-label-md text-label-md text-on-surface-variant hover:text-on-surface"
              }`}
              data-path="contato"
              href="#contato"
              onClick={(e) => handleNavigateSection(e, "#contato", "contato")}
            >
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-space-md">
            <a
              className="hidden sm:inline-flex items-center justify-center px-space-md py-space-sm rounded bg-primary-container text-on-primary-fixed font-label-md text-label-md hover:bg-gold-bright transition-colors shadow-sm tracking-wide whitespace-nowrap"
              data-path="contato"
              href="#contato"
              onClick={(e) => handleNavigateSection(e, "#contato", "contato")}
            >
              Entre em contato
            </a>
            <button
              type="button"
              onClick={() => setShowLawyerProfile(true)}
              title="Credenciais Institucionais — Dra. Ana Paula Gonçalves"
              className="rounded-full focus:outline-none focus:ring-1 focus:ring-gold-bright cursor-pointer"
            >
              <img
                alt="Dra. Ana Paula Gonçalves"
                className="w-8 h-8 rounded-full object-cover border border-subtle hover:border-gold-bright transition-colors"
                referrerPolicy="no-referrer"
                src={HTML_IMAGES.lawyerPortrait}
              />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menu de navegação"
              className="lg:hidden p-1.5 rounded bg-surface-graphite border border-subtle text-text-primary hover:text-gold-bright transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl block">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Menu Mobile Responsivo */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-charcoal/95 backdrop-blur-xl border-b border-subtle px-margin py-space-md space-y-space-sm">
            <div className="flex flex-col space-y-2">
              <a
                href="#inicio"
                onClick={(e) => handleNavigateSection(e, "#inicio", "inicio")}
                className="py-1.5 text-label-md text-text-primary hover:text-gold-bright transition-colors"
              >
                Início
              </a>
              <a
                href="#sobre"
                onClick={(e) => handleNavigateSection(e, "#sobre", "sobre")}
                className="py-1.5 text-label-md text-text-muted hover:text-gold-bright transition-colors"
              >
                Sobre
              </a>
              <a
                href="#areas"
                onClick={(e) =>
                  handleNavigateSection(e, "#areas", "areas-de-atuacao")
                }
                className="py-1.5 text-label-md text-text-muted hover:text-gold-bright transition-colors"
              >
                Áreas de Atuação
              </a>
              <a
                href="#como-atuamos"
                onClick={(e) =>
                  handleNavigateSection(e, "#como-atuamos", "como-atuamos")
                }
                className="py-1.5 text-label-md text-text-muted hover:text-gold-bright transition-colors"
              >
                Como Atuamos
              </a>
              <a
                href="#valores"
                onClick={(e) => handleNavigateSection(e, "#valores", "valores")}
                className="py-1.5 text-label-md text-text-muted hover:text-gold-bright transition-colors"
              >
                Valores
              </a>
              <a
                href="#contato"
                onClick={(e) => handleNavigateSection(e, "#contato", "contato")}
                className="py-1.5 text-label-md text-text-muted hover:text-gold-bright transition-colors"
              >
                Contato
              </a>
              <div className="pt-2 border-t border-subtle flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-gold-bright">
                  OAB/MG 000.000
                </span>
                <button
                  type="button"
                  onClick={(e) => handleOpenScreen(e, "informativo")}
                  className="text-body-sm text-gold-bright underline underline-offset-4"
                >
                  Artigos Informativos
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* CONTEÚDO PRINCIPAL OU TELAS INSTITUCIONAIS */}
      {currentScreen !== "home" ? (
        <LegalPagesView
          screen={currentScreen}
          onNavigateHome={(anchor) => {
            setCurrentScreen("home");
            setTimeout(() => {
              if (anchor) {
                document
                  .querySelector(anchor)
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }, 60);
          }}
          onChangeScreen={(scr) => {
            setCurrentScreen(scr);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />
      ) : (
        <main className="w-full pt-20 bg-surface animate-fade-in">
          <div className="flex flex-col w-full">
            {/* SEÇÃO 1: HERO (#inicio) */}
            <section
              className="relative w-full overflow-hidden bg-surface-charcoal border-b border-subtle"
              id="inicio"
            >
              {/* Interactive SVG background grid with animated draw lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hero-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="rgba(184, 146, 74, 0.08)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
                <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: "0.5s" }} />
                <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: "1s" }} />
                <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: "1.5s" }} />
                <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: "2s" }} />
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  className="grid-line"
                  style={{ animationDelay: "2.5s", opacity: 0.05 }}
                />
                <line
                  x1="0"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  className="grid-line"
                  style={{ animationDelay: "3s", opacity: 0.05 }}
                />
                <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3s" }} />
                <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: "3.2s" }} />
                <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.4s" }} />
                <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: "3.6s" }} />
                <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: "4s" }} />
              </svg>

              {/* Corner elements */}
              <div className="corner-element top-8 left-8" style={{ animationDelay: "2.5s" }}>
                <div className="absolute top-0 left-0 w-2 h-2 opacity-40 bg-gold-aged"></div>
              </div>
              <div className="corner-element top-8 right-8" style={{ animationDelay: "2.7s" }}>
                <div className="absolute top-0 right-0 w-2 h-2 opacity-40 bg-gold-aged"></div>
              </div>
              <div className="corner-element bottom-8 left-8" style={{ animationDelay: "2.9s" }}>
                <div className="absolute bottom-0 left-0 w-2 h-2 opacity-40 bg-gold-aged"></div>
              </div>
              <div className="corner-element bottom-8 right-8" style={{ animationDelay: "3.1s" }}>
                <div className="absolute bottom-0 right-0 w-2 h-2 opacity-40 bg-gold-aged"></div>
              </div>

              {/* Floating ambient elements */}
              <div className="floating-element" style={{ top: "25%", left: "15%", animationDelay: "3s" }}></div>
              <div className="floating-element" style={{ top: "60%", left: "85%", animationDelay: "3.5s" }}></div>
              <div className="floating-element" style={{ top: "40%", left: "10%", animationDelay: "4s" }}></div>
              <div className="floating-element" style={{ top: "75%", left: "90%", animationDelay: "4.5s" }}></div>

              {/* Ambient geometric light orbs */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-surface-coffee/40 blur-3xl hero-ambient-orb-1"></div>
                <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-gold-aged/20 blur-3xl hero-ambient-orb-2"></div>
              </div>

              {/* Mouse Following Glow */}
              <div
                id="mouse-gradient"
                ref={heroGradientRef}
                className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0 z-0"
                style={{
                  background: "radial-gradient(circle, rgba(184, 146, 74, 0.15) 0%, transparent 70%)",
                }}
              ></div>

              <div className="relative z-10 max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-2xl lg:py-space-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-space-2xl items-center">
                  {/* Coluna de Texto & Contexto */}
                  <div className="lg:col-span-7 flex flex-col items-start space-y-space-lg">
                    {/* Selo Regulatório OAB */}
                    <div className="hero-animate-badge inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-coffee/40 border border-gold-aged/40 text-gold-bright shadow-lg backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-beacon-dot absolute inline-flex h-full w-full rounded-full bg-gold-bright opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-bright"></span>
                      </span>
                      <span className="font-label-caps text-label-caps tracking-widest uppercase">
                        OAB/MG 000.000 · Atuação em Direito Civil, Empresarial e
                        Família
                      </span>
                    </div>

                    {/* Título Hero Nobre com animação de palavras e hover glow */}
                    <h1 className="hero-animate-title font-display-hero text-display-hero-mobile md:text-display-hero text-text-primary tracking-tight">
                      <span className="word" data-delay="100">Advocacia</span>
                      <span className="word" data-delay="220">ética,</span>
                      <span className="word text-gold-bright" data-delay="360">estratégica</span>
                      <span className="word" data-delay="500">e</span>
                      <span className="word" data-delay="620">dedicada</span>
                      <span className="word" data-delay="740">à</span>
                      <span className="word" data-delay="860">excelência</span>
                      <span className="word" data-delay="980">jurídica.</span>
                    </h1>

                    {/* Subtítulo Informativo com animação escalonada */}
                    <p className="hero-animate-desc font-body-lg text-body-lg text-text-muted max-w-2xl font-light leading-relaxed">
                      <span className="word" data-delay="1100">Orientação</span>
                      <span className="word" data-delay="1180">e</span>
                      <span className="word" data-delay="1260">representação</span>
                      <span className="word" data-delay="1340">jurídica</span>
                      <span className="word" data-delay="1420">especializada,</span>
                      <span className="word" data-delay="1500">pautadas</span>
                      <span className="word" data-delay="1580">pelo</span>
                      <span className="word" data-delay="1660">rigor</span>
                      <span className="word" data-delay="1740">técnico,</span>
                      <span className="word" data-delay="1820">discrição</span>
                      <span className="word" data-delay="1900">e</span>
                      <span className="word" data-delay="1980">atendimento</span>
                      <span className="word" data-delay="2060">personalizado</span>
                      <span className="word" data-delay="2140">para</span>
                      <span className="word" data-delay="2220">pessoas</span>
                      <span className="word" data-delay="2300">e</span>
                      <span className="word" data-delay="2380">empresas.</span>
                    </p>

                    {/* CTAs Discretos Conforme Provimento 205/2021 */}
                    <div className="hero-animate-cta flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-xs w-full sm:w-auto">
                      <a
                        className="btn-shimmer inline-flex items-center justify-center px-space-xl py-3 rounded bg-gradient-to-r from-gold-aged to-primary-container text-surface-charcoal font-label-md text-label-md font-semibold tracking-wider uppercase hover:from-gold-bright hover:to-gold-aged transition-all shadow-[0_4px_14px_rgba(184,146,74,0.25)] hover:shadow-[0_6px_20px_rgba(212,181,114,0.4)] hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                        href="#contato"
                        onClick={(e) =>
                          handleNavigateSection(e, "#contato", "contato")
                        }
                      >
                        Entre em contato
                        <span className="material-symbols-outlined text-base ml-2">
                          arrow_forward
                        </span>
                      </a>
                      <a
                        className="inline-flex items-center justify-center px-space-lg py-3 rounded border border-subtle bg-surface-graphite/40 hover:bg-surface-coffee/30 hover:border-gold-aged text-text-primary font-label-md text-label-md transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                        href="#areas"
                        onClick={(e) =>
                          handleNavigateSection(
                            e,
                            "#areas",
                            "areas-de-atuacao"
                          )
                        }
                      >
                        Conheça nossas áreas de atuação
                      </a>
                    </div>

                    {/* Micro Destaques Institucionais */}
                    <div className="hero-animate-metrics grid grid-cols-3 gap-space-md pt-space-lg border-t border-subtle/50 w-full max-w-xl text-left">
                      <div className="p-space-xs rounded transition-transform hover:-translate-y-1 duration-200">
                        <span className="block font-headline-sm text-headline-sm text-gold-bright">
                          100%
                        </span>
                        <span className="block font-body-sm text-body-sm text-text-muted mt-0.5">
                          Conformidade Ética OAB
                        </span>
                      </div>
                      <div className="p-space-xs rounded transition-transform hover:-translate-y-1 duration-200">
                        <span className="block font-headline-sm text-headline-sm text-gold-bright">
                          Atuação
                        </span>
                        <span className="block font-body-sm text-body-sm text-text-muted mt-0.5">
                          Preventiva &amp; Contenciosa
                        </span>
                      </div>
                      <div className="p-space-xs rounded transition-transform hover:-translate-y-1 duration-200">
                        <span className="block font-headline-sm text-headline-sm text-gold-bright">
                          Sigilo
                        </span>
                        <span className="block font-body-sm text-body-sm text-text-muted mt-0.5">
                          Garantido por Lei
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Coluna de Imagem da Advogada */}
                  <div className="hero-animate-portrait lg:col-span-5 relative flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md animate-float-slow">
                      {/* Moldura Decorativa Geométrica com Fio Dourado */}
                      <div className="hero-animate-frame-1 absolute -top-3 -left-3 w-full h-full border border-gold-aged/40 rounded pointer-events-none transform -rotate-1 shadow-[0_0_15px_rgba(184,146,74,0.15)]"></div>
                      <div className="hero-animate-frame-2 absolute -bottom-3 -right-3 w-full h-full border border-gold-aged/30 rounded pointer-events-none transform rotate-1 shadow-[0_0_15px_rgba(184,146,74,0.1)]"></div>

                      {/* Recipiente Principal da Fotografia */}
                      <div
                        onClick={() => setShowLawyerProfile(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setShowLawyerProfile(true);
                          }
                        }}
                        className="relative rounded overflow-hidden bg-surface-card border border-subtle shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group"
                      >
                        <img
                          alt="Dra. Ana Paula Gonçalves - Advogada Titular"
                          className="w-full h-[480px] object-cover object-top filter brightness-95 contrast-105 group-hover:scale-[1.01] transition-transform duration-300"
                          referrerPolicy="no-referrer"
                          src={HTML_IMAGES.lawyerPortrait}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-charcoal via-transparent to-transparent opacity-80"></div>

                        {/* Cartão de Identificação Embutido na Imagem */}
                        <div className="absolute bottom-4 left-4 right-4 p-space-md rounded bg-surface-graphite/90 backdrop-blur-md border border-subtle group-hover:border-gold-aged/60 transition-colors">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <h3 className="font-headline-sm text-headline-sm text-text-primary text-base sm:text-lg">
                                Dra. Ana Paula Gonçalves
                              </h3>
                              <p className="font-body-sm text-body-sm text-text-muted">
                                Advogada e Consultora Jurídica
                              </p>
                            </div>
                            <span className="font-label-caps text-label-caps text-gold-bright px-2 py-1 rounded bg-surface-coffee/40 border border-subtle whitespace-nowrap">
                              OAB/MG 000.000
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: SOBRE (#sobre) */}
            <section
              className="w-full bg-surface-graphite py-space-3xl border-b border-subtle"
              id="sobre"
            >
              <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
                  {/* Coluna Esquerda: Citação e Visual Arquitetural */}
                  <motion.div
                    className="lg:col-span-5 flex flex-col space-y-space-xl"
                    initial={{ opacity: 0, x: -36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="relative p-space-xl rounded bg-surface-card border border-subtle shadow-xl">
                      <span className="material-symbols-outlined text-gold-bright text-4xl mb-space-sm opacity-80 block">
                        balance
                      </span>
                      <blockquote className="font-headline-sm text-headline-sm text-text-primary italic leading-relaxed">
                        “A advocacia não é mero instrumento processual; é o
                        exercício contínuo da escuta qualificada, da prudência
                        técnica e da salvaguarda intransigente da dignidade e
                        dos direitos de cada constituinte.”
                      </blockquote>
                      <div className="mt-space-md pt-space-md border-t border-subtle flex items-center justify-between">
                        <div>
                          <span className="font-label-md text-label-md text-text-primary font-medium block">
                            Dra. Ana Paula Gonçalves
                          </span>
                          <span className="font-body-sm text-body-sm text-text-muted">
                            Fundadora do Escritório
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowLawyerProfile(true)}
                          title="Ver credenciais institucionais"
                          className="w-8 h-8 rounded-full bg-surface-coffee/40 border border-subtle hover:border-gold-bright flex items-center justify-center text-gold-bright text-xs transition-colors cursor-pointer"
                        >
                          APG
                        </button>
                      </div>
                    </div>

                    {/* Indicador Gráfico Suave de Rigor Metodológico */}
                    <div className="p-space-lg rounded bg-surface-charcoal border border-subtle/60 flex items-center gap-space-md">
                      <div className="w-12 h-12 rounded bg-surface-coffee/30 flex items-center justify-center flex-shrink-0 text-gold-aged">
                        <span className="material-symbols-outlined text-2xl">
                          verified_user
                        </span>
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-text-primary font-medium">
                          Deontologia e Compromisso
                        </h4>
                        <p className="font-body-sm text-body-sm text-text-muted mt-0.5">
                          Atuação pautada estritamente no Código de Ética e
                          Disciplina da Ordem dos Advogados do Brasil.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Coluna Direita: Trajetória e Pilares Estratégicos */}
                  <motion.div
                    className="lg:col-span-7 flex flex-col space-y-space-lg"
                    initial={{ opacity: 0, x: 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="space-y-space-xs">
                      <span className="font-label-caps text-label-caps text-gold-bright uppercase tracking-widest block">
                        Institucional
                      </span>
                      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                        Sobre o Escritório e Condução Profissional
                      </h2>
                    </div>
                    <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                      A{" "}
                      <strong className="text-text-primary font-medium">
                        APG Advocacia
                      </strong>{" "}
                      foi constituída com a vocação de entregar uma advocacia de
                      caráter nobre, customizada e distante da massificação
                      corporativa. Sob a liderança da Dra. Ana Paula Gonçalves, o
                      escritório reúne solidez acadêmica e experiência prática
                      direcionadas à solução de demandas de alta complexidade.
                    </p>
                    <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                      Nosso compromisso não se restringe à tutela judicial;
                      dedicamos atenção prioritária ao desenho de soluções
                      preventivas capazes de conferir estabilidade patrimonial,
                      mitigar exposições a litígios e preservar relações
                      intersubjetivas de valor.
                    </p>

                    {/* 3 Pilares Fundamentais Conforme PRD */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-sm">
                      {[
                        { icon: "person_search", title: "Atendimento Individualizado", text: "Análise aprofundada de cada demanda com dedicação direta e sem intermediários desqualificados." },
                        { icon: "lock", title: "Sigilo e Rigor Técnico", text: "Confidencialidade estrita em todas as etapas, salvaguardando documentos e informações sensíveis." },
                        { icon: "visibility", title: "Transparência Contínua", text: "Comunicação clara, acessível e relatórios periódicos sobre o andamento dos procedimentos." },
                      ].map((pilar, i) => (
                        <motion.div
                          key={pilar.title}
                          className="card-interactive p-space-md rounded bg-surface-card/60 border border-subtle/60 hover:border-gold-aged/60 transition-all cursor-pointer"
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="w-9 h-9 rounded bg-surface-coffee/30 flex items-center justify-center text-gold-bright mb-space-sm">
                            <span className="material-symbols-outlined text-xl">{pilar.icon}</span>
                          </div>
                          <h3 className="font-label-md text-label-md text-text-primary font-semibold">{pilar.title}</h3>
                          <p className="font-body-sm text-body-sm text-text-muted mt-space-xs">{pilar.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: ÁREAS DE ATUAÇÃO (#areas) */}
            <section
              className="w-full bg-surface py-space-3xl border-b border-subtle"
              id="areas"
            >
              <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md"
                >
                  <div className="space-y-space-xs max-w-2xl">
                    <span className="font-label-caps text-label-caps text-gold-bright uppercase tracking-widest block">
                      Prática Jurídica
                    </span>
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                      Áreas de Atuação Jurídica
                    </h2>
                    <p className="font-body-md text-body-md text-text-muted">
                      Consultoria preventiva e contencioso estratégico com
                      soluções desenhadas sob medida para pessoas físicas e
                      jurídicas em Belo Horizonte/MG e em todo o território nacional.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-text-muted font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-gold-aged text-base">
                      gavel
                    </span>
                    <span>Exercício da advocacia especializada</span>
                  </div>
                </motion.div>

                {/* Grid com os 6 cards do PRD com animação fade-in suave no scroll */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                  {PRACTICE_AREAS.map((area, index) => (
                    <motion.div
                      key={area.id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                        margin: "0px 0px -40px 0px",
                      }}
                      transition={{
                        duration: 0.65,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                      }}
                      onClick={() => setSelectedArea(area)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedArea(area);
                        }
                      }}
                      className="card-interactive group p-space-xl rounded bg-surface-card border border-subtle hover:border-gold-bright flex flex-col justify-between cursor-pointer text-left"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-space-md">
                          <span className="font-label-caps text-label-caps text-gold-bright/60 group-hover:text-gold-bright transition-colors duration-300">
                            {area.code}
                          </span>
                          <span className="material-symbols-outlined text-gold-aged group-hover:text-gold-bright transition-colors duration-300 text-2xl">
                            {area.icon}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-text-primary group-hover:text-gold-bright transition-colors duration-300">
                          {area.title}
                        </h3>
                        <p className="font-body-md text-body-md text-text-muted mt-space-sm leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                      <div className="pt-space-md mt-space-md border-t border-subtle/50 flex items-center justify-between text-body-sm text-gold-aged group-hover:text-gold-bright transition-colors duration-300">
                        <span>{area.footerLabel}</span>
                        <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform duration-300">
                          arrow_forward
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* SEÇÃO 4: COMO ATUAMOS (#como-atuamos) */}
            <section
              className="w-full bg-surface-graphite py-space-3xl border-b border-subtle"
              id="como-atuamos"
            >
              <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center max-w-3xl mx-auto mb-space-2xl space-y-space-xs"
                >
                  <span className="font-label-caps text-label-caps text-gold-bright uppercase tracking-widest block">
                    Procedimento Técnico
                  </span>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                    Metodologia de Atendimento
                  </h2>
                  <p className="font-body-md text-body-md text-text-muted">
                    Cada demanda é conduzida sob um protocolo de rigor
                    metodológico, garantindo previsibilidade, clareza probatória
                    e acompanhamento integral.
                  </p>
                </motion.div>

                {/* Linha do Tempo em 4 Etapas com Fios Conectores */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                  {/* Fio Conector Dourado Oculto em Telas Pequenas */}
                  <div className="hidden lg:block absolute top-1/4 left-12 right-12 h-px bg-gradient-to-r from-gold-aged/10 via-gold-aged/40 to-gold-aged/10 z-0"></div>

                  {[
                    {
                      num: "01",
                      title: "Escuta Atenta & Diagnóstico Inicial",
                      desc: "Compreensão minuciosa das particularidades fáticas e dos objetivos do cliente através de consulta estruturada.",
                      icon: "hearing",
                      tag: "Avaliação Preliminar",
                    },
                    {
                      num: "02",
                      title: "Análise Jurídica & Estratégia",
                      desc: "Avaliação aprofundada de riscos, precedentes dos tribunais superiores e desenho do plano de ação sob medida.",
                      icon: "menu_book",
                      tag: "Estudo Doutrinário",
                    },
                    {
                      num: "03",
                      title: "Atuação Técnica Diligente",
                      desc: "Condução precisa dos trâmites perante cartórios, câmaras de mediação ou instâncias do Poder Judiciário.",
                      icon: "assignment_turned_in",
                      tag: "Execução Rigorosa",
                    },
                    {
                      num: "04",
                      title: "Acompanhamento & Comunicação",
                      desc: "Atualizações regulares com linguagem transparente, garantindo total ciência de cada andamento do processo.",
                      icon: "sync",
                      tag: "Report Periódico",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="card-interactive relative z-10 p-space-lg rounded bg-surface-card border border-subtle hover:border-gold-aged/60 flex flex-col items-start space-y-space-sm cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded bg-surface-charcoal border border-gold-aged/40 flex items-center justify-center text-gold-bright font-headline-sm font-semibold shadow-md">
                        {step.num}
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-text-primary text-lg">
                        {step.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-muted leading-relaxed">
                        {step.desc}
                      </p>
                      <div className="pt-space-xs flex items-center gap-1.5 text-gold-aged font-label-caps text-label-caps">
                        <span className="material-symbols-outlined text-sm">
                          {step.icon}
                        </span>
                        <span>{step.tag}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* SEÇÃO 5: VALORES & COMPROMISSO ÉTICO (#valores) */}
            <section
              className="w-full bg-surface py-space-3xl border-b border-subtle"
              id="valores"
            >
              <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
                  {/* Esquerda: Síntese de Identidade Ética */}
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-4 flex flex-col space-y-space-md"
                  >
                    <span className="font-label-caps text-label-caps text-gold-bright uppercase tracking-widest block">
                      Fundamentos da Banca
                    </span>
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                      Pilares Institucionais
                    </h2>
                    <p className="font-body-md text-body-md text-text-muted leading-relaxed">
                      A prática do direito exige retidão e constância. Nossos
                      pilares traduzem o respeito irrestrito aos mandamentos da
                      advocacia e a proteção contínua dos interesses confiados.
                    </p>
                    <div className="p-space-md rounded bg-surface-card border border-subtle mt-space-sm">
                      <div className="flex items-center gap-space-sm text-gold-bright mb-1">
                        <span className="material-symbols-outlined text-lg">
                          shield
                        </span>
                        <span className="font-label-md text-label-md font-semibold">
                          Provimento nº 205/2021
                        </span>
                      </div>
                      <p className="font-legal-disclaimer text-legal-disclaimer text-text-muted">
                        Comunicação orientada à estrita finalidade de informação
                        jurídica, repelindo o mercantilismo e a captação
                        indevida de clientela.
                      </p>
                    </div>
                  </motion.div>

                  {/* Direita: 4 Blocos de Destaque */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {[
                      {
                        icon: "balance",
                        title: "Ética e Deontologia",
                        text: "Estrita observância aos preceitos da Lei nº 8.906/1994 (Estatuto da OAB) e do Código de Ética e Disciplina, prezando pela lealdade processual e dignidade da profissão.",
                      },
                      {
                        icon: "vpn_key",
                        title: "Sigilo Profissional Absoluto",
                        text: "Proteção perpétua sobre fatos, documentos e confidências, respaldada por infraestrutura tecnológica em conformidade com a LGPD (Lei nº 13.709/2018).",
                      },
                      {
                        icon: "translate",
                        title: "Clareza e Objetividade",
                        text: "Desmistificação do vocabulário jurídico para propiciar compreensões lúcidas, permitindo tomadas de decisão seguras e plenamente conscientes.",
                      },
                      {
                        icon: "lightbulb",
                        title: "Foco na Solução Preventiva",
                        text: "Busca prioritária pela pacificação extrajudicial de conflitos e blindagem contratual, otimizando recursos e prevenindo o desgaste dos tribunais.",
                      },
                    ].map((val, i) => (
                      <motion.div
                        key={val.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                          duration: 0.6,
                          delay: i * 0.1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="card-interactive p-space-lg rounded bg-surface-card border border-subtle hover:border-gold-aged/60 flex flex-col cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded bg-surface-coffee/20 flex items-center justify-center text-gold-bright mb-space-sm">
                          <span className="material-symbols-outlined text-xl">
                            {val.icon}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-text-primary text-base">
                          {val.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-text-muted mt-space-xs leading-relaxed">
                          {val.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 6: CONTATO & LOCALIZAÇÃO (#contato) */}
            <section
              className="w-full bg-surface-graphite py-space-3xl"
              id="contato"
            >
              <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center max-w-3xl mx-auto mb-space-2xl space-y-space-xs"
                >
                  <span className="font-label-caps text-label-caps text-gold-bright uppercase tracking-widest block">
                    Canais Institucionais
                  </span>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
                    Canais de Atendimento e Consulta
                  </h2>
                  <p className="font-body-md text-body-md text-text-muted">
                    Entre em contato para agendar uma consulta inicial ou
                    esclarecer dúvidas sobre a atuação do escritório.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
                  {/* Coluna Esquerda: Formulário de Contato Institucional */}
                  <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7 bg-surface-card p-space-xl rounded border border-subtle shadow-2xl"
                  >
                    <div className="flex items-center gap-space-sm mb-space-lg">
                      <span className="material-symbols-outlined text-gold-bright text-2xl">
                        mail
                      </span>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-text-primary text-lg">
                          Envio de Mensagem
                        </h3>
                        <p className="font-body-sm text-body-sm text-text-muted">
                          Seus dados serão tratados com estrito sigilo
                          profissional.
                        </p>
                      </div>
                    </div>

                    <form
                      className="space-y-space-md"
                      id="contactForm"
                      onSubmit={handleFormSubmit}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col space-y-1">
                          <label
                            className="font-label-md text-label-md text-text-primary"
                            htmlFor="nome"
                          >
                            Nome Completo{" "}
                            <span className="text-gold-aged">*</span>
                          </label>
                          <input
                            className="w-full px-space-md py-2.5 rounded bg-surface-graphite border border-subtle focus:border-gold-bright focus:outline-none text-text-primary font-body-md text-body-md placeholder-text-muted/40 transition-colors"
                            id="nome"
                            placeholder="Ex.: Carlos Eduardo Silva"
                            required
                            type="text"
                            value={formData.nome}
                            onChange={(e) =>
                              setFormData({ ...formData, nome: e.target.value })
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label
                            className="font-label-md text-label-md text-text-primary"
                            htmlFor="email"
                          >
                            E-mail Profissional / Pessoal{" "}
                            <span className="text-gold-aged">*</span>
                          </label>
                          <input
                            className="w-full px-space-md py-2.5 rounded bg-surface-graphite border border-subtle focus:border-gold-bright focus:outline-none text-text-primary font-body-md text-body-md placeholder-text-muted/40 transition-colors"
                            id="email"
                            placeholder="carlos@exemplo.com.br"
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                        <div className="flex flex-col space-y-1">
                          <label
                            className="font-label-md text-label-md text-text-primary"
                            htmlFor="telefone"
                          >
                            Telefone / WhatsApp{" "}
                            <span className="text-gold-aged">*</span>
                          </label>
                          <input
                            className="w-full px-space-md py-2.5 rounded bg-surface-graphite border border-subtle focus:border-gold-bright focus:outline-none text-text-primary font-body-md text-body-md placeholder-text-muted/40 transition-colors"
                            id="telefone"
                            placeholder="(31) 98765-4321"
                            required
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                telefone: formatPhone(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label
                            className="font-label-md text-label-md text-text-primary"
                            htmlFor="area"
                          >
                            Área de Interesse
                          </label>
                          <select
                            className="w-full px-space-md py-2.5 rounded bg-surface-graphite border border-subtle focus:border-gold-bright focus:outline-none text-text-primary font-body-md text-body-md transition-colors"
                            id="area"
                            value={formData.area}
                            onChange={(e) =>
                              setFormData({ ...formData, area: e.target.value })
                            }
                          >
                            <option value="civil">
                              Direito Civil &amp; Contratos
                            </option>
                            <option value="familia">
                              Direito de Família &amp; Sucessões
                            </option>
                            <option value="imobiliario">
                              Direito Imobiliário
                            </option>
                            <option value="empresarial">
                              Direito Empresarial &amp; Societário
                            </option>
                            <option value="consumidor">
                              Direito do Consumidor
                            </option>
                            <option value="consenso">
                              Resolução Consensual de Conflitos
                            </option>
                            <option value="outro">
                              Outra matéria jurídica
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1">
                        <label
                          className="font-label-md text-label-md text-text-primary"
                          htmlFor="mensagem"
                        >
                          Mensagem / Resumo do Caso{" "}
                          <span className="text-gold-aged">*</span>
                        </label>
                        <textarea
                          className="w-full px-space-md py-2.5 rounded bg-surface-graphite border border-subtle focus:border-gold-bright focus:outline-none text-text-primary font-body-md text-body-md placeholder-text-muted/40 transition-colors"
                          id="mensagem"
                          placeholder="Descreva suscintamente o contexto da sua solicitação..."
                          required
                          rows={4}
                          value={formData.mensagem}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mensagem: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>

                      {/* Checkbox Obrigatório LGPD */}
                      <div className="flex items-start gap-space-sm pt-space-xs">
                        <input
                          className="mt-1 w-4 h-4 rounded bg-surface-graphite border border-gold-aged/50 accent-gold-aged focus:ring-0 cursor-pointer"
                          id="lgpd"
                          required
                          type="checkbox"
                          checked={formData.lgpd}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lgpd: e.target.checked,
                            })
                          }
                        />
                        <label
                          className="font-legal-disclaimer text-legal-disclaimer text-text-muted leading-tight cursor-pointer"
                          htmlFor="lgpd"
                        >
                          Concordo com o tratamento dos meus dados para fins
                          exclusivos de retorno deste contato institucional, em
                          estrita conformidade com a{" "}
                          <strong className="text-gold-bright">
                            Lei Geral de Proteção de Dados (LGPD - Lei nº
                            13.709/2018)
                          </strong>{" "}
                          e a{" "}
                          <button
                            type="button"
                            onClick={(e) => handleOpenScreen(e, "privacidade")}
                            className="text-gold-bright underline underline-offset-2 hover:text-text-primary cursor-pointer"
                          >
                            Política de Privacidade
                          </button>{" "}
                          do escritório.
                        </label>
                      </div>

                      <button
                        className="w-full py-3 rounded bg-gradient-to-r from-gold-aged to-primary-container text-surface-charcoal font-label-md text-label-md font-semibold tracking-wider uppercase hover:from-gold-bright hover:to-gold-aged transition-all shadow-[0_4px_14px_rgba(184,146,74,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                        type="submit"
                      >
                        <span>Enviar Mensagem Institucional</span>
                        <span className="material-symbols-outlined text-base">
                          send
                        </span>
                      </button>

                      {/* Mensagem de Sucesso */}
                      {formSubmitted && (
                        <div
                          className="p-space-md rounded bg-surface-coffee/30 border border-gold-aged text-gold-bright font-body-sm text-body-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          id="formSuccess"
                        >
                          <div className="flex items-start sm:items-center gap-2">
                            <span className="material-symbols-outlined">
                              check_circle
                            </span>
                            <span>
                              Sua mensagem foi recebida com sucesso (Protocolo{" "}
                              <strong>{protocolNumber}</strong>). O escritório
                              retornará pelo canal indicado em até 1 dia útil.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFormSubmitted(false);
                              setFormData({
                                nome: "",
                                email: "",
                                telefone: "",
                                area: "civil",
                                mensagem: "",
                                lgpd: false,
                              });
                            }}
                            className="text-xs underline underline-offset-2 text-text-primary hover:text-gold-bright whitespace-nowrap self-end sm:self-center cursor-pointer"
                          >
                            Nova mensagem
                          </button>
                        </div>
                      )}
                    </form>
                  </motion.div>

                  {/* Coluna Direita: Informações de Contato, Atendimento e Mapa */}
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="lg:col-span-5 flex flex-col justify-between space-y-space-lg"
                  >
                    {/* Detalhes de Localização e Horários */}
                    <div className="p-space-xl rounded bg-surface-card border border-subtle shadow-xl space-y-space-md">
                      <h3 className="font-headline-sm text-headline-sm text-text-primary text-lg border-b border-subtle pb-space-sm">
                        Informações Oficiais
                      </h3>
                      <div className="space-y-space-md">
                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-gold-bright text-xl flex-shrink-0 mt-0.5">
                            location_on
                          </span>
                          <div>
                            <span className="font-label-md text-label-md text-text-primary block font-medium">
                              Sede Institucional
                            </span>
                            <span className="font-body-sm text-body-sm text-text-muted leading-relaxed block">
                              Av. do Contorno, 6594, Conj. 142
                              <br />
                              Savassi, Belo Horizonte - MG, CEP 30110-044
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-gold-bright text-xl flex-shrink-0 mt-0.5">
                            schedule
                          </span>
                          <div>
                            <span className="font-label-md text-label-md text-text-primary block font-medium">
                              Horário de Atendimento
                            </span>
                            <span className="font-body-sm text-body-sm text-text-muted leading-relaxed block">
                              Segunda a Sexta-feira, das 09h às 18h
                              <br />
                              <span className="text-gold-aged text-xs">
                                (Consultas presenciais mediante agendamento
                                prévio)
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-gold-bright text-xl flex-shrink-0 mt-0.5">
                            mail
                          </span>
                          <div>
                            <span className="font-label-md text-label-md text-text-primary block font-medium">
                              Correio Eletrônico
                            </span>
                            <a
                              className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                              href="mailto:contato@apgadvocacia.com.br"
                            >
                              contato@apgadvocacia.com.br
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-gold-bright text-xl flex-shrink-0 mt-0.5">
                            chat
                          </span>
                          <div>
                            <span className="font-label-md text-label-md text-text-primary block font-medium">
                              Comunicação Instantânea
                            </span>
                            <a
                              className="font-body-sm text-body-sm text-gold-bright hover:underline flex items-center gap-1 mt-0.5"
                              href="https://wa.me/553132848900?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20institucionais%20sobre%20a%20atua%C3%A7%C3%A3o%20do%20escrit%C3%B3rio%20em%20Belo%20Horizonte."
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <span>Conversar pelo WhatsApp</span>
                              <span className="material-symbols-outlined text-xs">
                                open_in_new
                              </span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-space-sm">
                          <span className="material-symbols-outlined text-gold-bright text-xl flex-shrink-0 mt-0.5">
                            public
                          </span>
                          <div>
                            <span className="font-label-md text-label-md text-text-primary block font-medium">
                              Canal Informativo
                            </span>
                            <a
                              href="https://instagram.com/advocaciaapg"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                            >
                              @advocaciaapg (Instagram Institucional)
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mapa Estilizado com Link Direto da Imagem do HTML */}
                    <div className="relative rounded overflow-hidden border border-subtle shadow-xl group">
                      <img
                        src={HTML_IMAGES.mapFariaLima}
                        alt="Mapa de localização Av. do Contorno, 6594, Savassi, Belo Horizonte - MG"
                        referrerPolicy="no-referrer"
                        data-location="Av. do Contorno, 6594, Savassi, Belo Horizonte - MG"
                        className="w-full h-48 object-cover object-center rounded block"
                      />
                      <div className="absolute inset-0 bg-surface-charcoal/20 pointer-events-none"></div>
                      <div className="absolute bottom-2 left-2 right-2 px-space-sm py-1 rounded bg-surface-graphite/90 backdrop-blur-sm border border-subtle flex items-center justify-between text-text-muted font-legal-disclaimer text-legal-disclaimer">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs text-gold-bright">
                            pin_drop
                          </span>
                          Savassi · Belo Horizonte/MG
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyAddress}
                          className="text-gold-aged hover:text-gold-bright transition-colors cursor-pointer"
                        >
                          {addressCopied
                            ? "Endereço Copiado"
                            : "Acesso Facilitado"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* BOTÃO FLUTUANTE DE ATENDIMENTO INSTITUCIONAL */}
      <motion.aside
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-space-xl right-space-xl z-40"
      >
        <a
          aria-label="Canal institucional de atendimento WhatsApp"
          className="group flex items-center gap-space-sm px-space-md py-space-sm rounded-full bg-surface-graphite text-gold-bright border border-subtle hover:bg-surface-card hover:text-text-primary transition-all shadow-[0_16px_36px_-6px_rgba(0,0,0,0.6)] animate-pulse-gold cursor-pointer"
          data-path="contato"
          href="#contato"
          onClick={(e) => handleNavigateSection(e, "#contato", "contato")}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-beacon-dot absolute inline-flex h-full w-full rounded-full bg-gold-bright opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-bright"></span>
          </span>
          <span className="material-symbols-outlined text-gold-bright group-hover:scale-110 transition-transform">
            chat_bubble_outline
          </span>
          <span className="font-label-md text-label-md tracking-wide hidden sm:inline whitespace-nowrap">
            Atendimento Institucional
          </span>
        </a>
      </motion.aside>

      {/* BANNER DE PRIVACIDADE E COOKIES (LGPD) */}
      {!cookieConsentDismissed && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-space-sm sm:p-space-md pointer-events-none">
          <div className="max-w-4xl mx-auto p-space-md rounded bg-surface-card/95 backdrop-blur-md border border-subtle shadow-2xl flex flex-col md:flex-row items-center justify-between gap-space-md pointer-events-auto">
            <div className="flex items-start gap-space-sm text-text-muted">
              <span className="material-symbols-outlined text-gold-aged text-xl flex-shrink-0 mt-0.5">
                shield
              </span>
              <p className="font-legal-disclaimer text-legal-disclaimer">
                Este portal utiliza cookies estritamente necessários para
                assegurar a estabilidade e integridade da navegação, em total
                conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei
                nº 13.709/2018 - LGPD). Ao prosseguir, você consente com nossa
                conduta de privacidade.
              </p>
            </div>
            <div className="flex items-center gap-space-sm flex-shrink-0 w-full md:w-auto justify-end">
              <a
                className="font-legal-disclaimer text-legal-disclaimer text-gold-bright underline underline-offset-4 hover:text-text-primary transition-colors whitespace-nowrap"
                data-path="politica-de-privacidade"
                href="#privacidade"
                onClick={(e) => handleOpenScreen(e, "privacidade")}
              >
                Privacidade
              </a>
              <button
                className="px-space-md py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-text-primary font-label-caps text-label-caps uppercase transition-colors cursor-pointer whitespace-nowrap"
                onClick={() => setCookieConsentDismissed(true)}
                type="button"
              >
                Compreendi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RODAPÉ INSTITUCIONAL */}
      <footer className="w-full bg-surface-charcoal pt-space-3xl pb-space-2xl border-t border-subtle">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl mb-space-2xl">
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <img
                  alt="Logo APG Advocacia"
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                  src={HTML_IMAGES.logo}
                />
                <span className="font-headline-sm text-headline-sm text-text-primary tracking-tight">
                  APG Advocacia
                </span>
              </div>
              <p className="font-body-md text-body-md text-text-muted max-w-md">
                Sociedade individual de advocacia pautada na excelência técnica,
                discrição absoluta e atendimento personalizado a pessoas físicas
                e jurídicas em matéria estratégica consultiva e contenciosa.
              </p>
              <div className="flex flex-col gap-space-xs mt-space-sm">
                <span className="font-label-md text-label-md text-text-primary font-medium">
                  Dra. Ana Paula Gonçalves
                </span>
                <span className="font-label-caps text-label-caps text-gold-bright">
                  Inscrição OAB/MG 000.000
                </span>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-space-sm">
              <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-xs">
                Navegação
              </h4>
              <nav className="flex flex-col gap-space-xs">
                <a
                  className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                  data-path="inicio"
                  href="#inicio"
                  onClick={(e) => handleNavigateSection(e, "#inicio", "inicio")}
                >
                  Início
                </a>
                <a
                  className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                  data-path="sobre"
                  href="#sobre"
                  onClick={(e) => handleNavigateSection(e, "#sobre", "sobre")}
                >
                  Sobre a Banca
                </a>
                <a
                  className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                  data-path="areas-de-atuacao"
                  href="#areas"
                  onClick={(e) =>
                    handleNavigateSection(e, "#areas", "areas-de-atuacao")
                  }
                >
                  Áreas de Prática
                </a>
                <a
                  className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                  data-path="como-atuamos"
                  href="#como-atuamos"
                  onClick={(e) =>
                    handleNavigateSection(e, "#como-atuamos", "como-atuamos")
                  }
                >
                  Metodologia de Atuação
                </a>
                <a
                  className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                  data-path="valores"
                  href="#valores"
                  onClick={(e) =>
                    handleNavigateSection(e, "#valores", "valores")
                  }
                >
                  Valores &amp; Ética
                </a>
                <a
                  className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                  data-path="contato"
                  href="#contato"
                  onClick={(e) =>
                    handleNavigateSection(e, "#contato", "contato")
                  }
                >
                  Canais Institucionais
                </a>
                <a
                  className="font-body-sm text-body-sm text-text-muted hover:text-gold-bright transition-colors"
                  href="#informativo"
                  onClick={(e) => handleOpenScreen(e, "informativo")}
                >
                  Publicações &amp; Artigos
                </a>
              </nav>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-space-sm">
              <h4 className="font-headline-sm text-headline-sm text-text-primary mb-space-xs">
                Sede &amp; Contato
              </h4>
              <address className="not-italic flex flex-col gap-space-sm font-body-sm text-body-sm text-text-muted">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-gold-aged text-lg flex-shrink-0">
                    location_on
                  </span>
                  <span>
                    Av. do Contorno, 6594, Conj. 142
                    <br />
                    Savassi, Belo Horizonte - MG, CEP 30110-044
                  </span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-gold-aged text-lg flex-shrink-0">
                    mail
                  </span>
                  <a
                    className="hover:text-text-primary transition-colors"
                    href="mailto:contato@apgadvocacia.com.br"
                  >
                    contato@apgadvocacia.com.br
                  </a>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-gold-aged text-lg flex-shrink-0">
                    call
                  </span>
                  <span>+55 (31) 3284-8900 / Atendimento Oficial</span>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-gold-aged text-lg flex-shrink-0">
                    public
                  </span>
                  <a
                    href="https://instagram.com/advocaciaapg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-bright hover:underline"
                  >
                    @advocaciaapg (Instagram Institucional)
                  </a>
                </div>
              </address>
            </div>
          </div>

          <div className="p-space-md rounded bg-surface-graphite text-text-muted mb-space-xl border border-subtle/40">
            <p className="font-legal-disclaimer text-legal-disclaimer leading-relaxed text-center">
              <strong className="text-gold-bright font-semibold uppercase tracking-wider block sm:inline mr-2">
                Aviso Regulatório:
              </strong>
              Este site tem caráter meramente informativo, em estrita
              conformidade com o Provimento nº 205/2021 do Conselho Federal da
              OAB e com o Código de Ética e Disciplina. Seu conteúdo não
              constitui aconselhamento jurídico ou promessa de resultado. A
              relação advogado-cliente somente se estabelece mediante
              instrumento contratual formal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-lg border-t border-subtle/40 text-text-muted font-legal-disclaimer text-legal-disclaimer">
            <div>
              © 2025 APG Advocacia. Todos os direitos reservados. Razão Social:
              Ana Paula Gonçalves Sociedade Individual de Advocacia.
            </div>
            <div className="flex items-center gap-space-lg">
              <a
                className="hover:text-gold-bright transition-colors"
                data-path="politica-de-privacidade"
                href="#privacidade"
                onClick={(e) => handleOpenScreen(e, "privacidade")}
              >
                Política de Privacidade (LGPD)
              </a>
              <a
                className="hover:text-gold-bright transition-colors"
                data-path="termos-de-uso"
                href="#termos"
                onClick={(e) => handleOpenScreen(e, "termos")}
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </motion.div>
      </footer>

      {/* MODAL INTERATIVO DE ÁREA DE ATUAÇÃO / ARTIGO / CREDENCIAIS */}
      <PracticeAreaModal
        selectedArea={selectedArea}
        selectedArticle={selectedArticle}
        showLawyerProfile={showLawyerProfile}
        onClose={() => {
          setSelectedArea(null);
          setSelectedArticle(null);
          setShowLawyerProfile(false);
        }}
        onConsultArea={handleConsultArea}
      />
    </div>
  );
}
