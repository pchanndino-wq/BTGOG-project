import React from "react";
import { HeartHandshake, School, BriefcaseBusiness, Hospital, Warehouse } from "lucide-react";

const e = React.createElement;

export function App() {
  return e("div", { className: "page-transition min-h-screen" }, [
    e(Header, { key: "header" }),
    e(Main, { key: "main" }),
    e(Footer, { key: "footer" }),
  ]);
}

function Header() {
  return e("header", { className: "sticky top-0 z-50 bg-btgog-cream/80 backdrop-blur border-b border-btgog-sand" }, 
    e("div", { className: "max-w-6xl mx-auto px-6 py-4 flex items-center justify-between" }, [
      e("div", { key: "brand" }, [
        e("div", { key: "title", className: "font-serif text-2xl text-btgog-ink" }, "BTGOG"),
        e("div", { key: "sub", className: "text-sm text-btgog-sage" }, "Build The Ground of Growth"),
      ]),
      e("nav", { key: "nav", className: "flex gap-4 text-sm font-medium text-btgog-sage" }, [
        e("a", { key: "a1", href: "#campuses", className: "hover:text-btgog-ink" }, "Campuses"),
        e("a", { key: "a2", href: "#contact", className: "hover:text-btgog-ink" }, "Contact"),
      ])
    ])
  );
}

function Main() {
  return e("main", { className: "max-w-6xl mx-auto px-6 py-10" }, [
    e("section", { key: "hero", className: "soft-shadow bg-white rounded-3xl p-10 border border-btgog-sand" }, [
      e("h1", { key: "h1", className: "font-serif text-4xl md:text-5xl leading-tight text-btgog-ink" },
        "A real plan to end homelessness—through education, training, and support."
      ),
      e("p", { key: "p1", className: "mt-4 text-lg text-btgog-sage max-w-2xl" },
        "BTGOG develops specialized campuses that stabilize individuals and families while building a pathway to employment, health, and long-term independence."
      ),
      e("div", { key: "cta", className: "mt-6 flex flex-wrap gap-3" }, [
        e("a", {
          key: "btn1",
          href: "#campuses",
          className: "inline-flex items-center rounded-full px-5 py-3 bg-btgog-sage text-white font-semibold hover:opacity-95"
        }, "View campuses"),
        e("a", {
          key: "btn2",
          href: "#contact",
          className: "inline-flex items-center rounded-full px-5 py-3 bg-btgog-sageLight text-btgog-sage font-semibold hover:opacity-95"
        }, "Get in touch")
      ])
    ]),

    e("section", { key: "campuses", id: "campuses", className: "mt-10" }, [
      e("h2", { key: "h2", className: "font-serif text-3xl text-btgog-ink" }, "Campus programs"),
      e("p", { key: "p2", className: "mt-2 text-btgog-sage max-w-3xl" },
        "Each campus is purpose-built to serve a defined population with measurable outcomes, wraparound services, and workforce pathways."
      ),

      e("div", { key: "grid", className: "mt-6 grid md:grid-cols-2 gap-6" }, [
        card("Family Campus", "Daycare, K–12 pathways, adult education, healthcare, on-site jobs.", HeartHandshake),
        card("Education Campus", "Classrooms, tutoring, literacy programs, credential support.", School),
        card("Workforce Campus", "Training, apprenticeships, on-site work experience.", BriefcaseBusiness),
        card("Health Campus", "Primary care, wellness, stabilization services.", Hospital),
        card("Operations Campus", "Warehouse + data center job pathways and training.", Warehouse)
      ])
    ]),

    e("section", { key: "contact", id: "contact", className: "mt-10 soft-shadow bg-white rounded-3xl p-8 border border-btgog-sand" }, [
      e("h3", { key: "h3", className: "font-serif text-2xl text-btgog-ink" }, "Contact"),
      e("p", { key: "p3", className: "mt-2 text-btgog-sage" }, "Seven Crawford • (442) 375-8487"),
      e("a", { key: "call", href: "tel:4423758487", className: "mt-4 inline-flex rounded-full px-5 py-3 bg-btgog-clay text-white font-semibold hover:opacity-95" }, "Call now")
    ])
  ]);
}

function card(title, desc, Icon) {
  const e = React.createElement;
  return e("div", { key: title, className: "soft-shadow bg-btgog-sageLight rounded-3xl p-6 border border-btgog-sand" }, [
    e("div", { key: "top", className: "flex items-start gap-3" }, [
      e("div", { key: "iconWrap", className: "p-3 rounded-2xl bg-white border border-btgog-sand" },
        e(Icon, { size: 22, color: "#4B6350" })
      ),
      e("div", { key: "text" }, [
        e("h4", { key: "t", className: "font-serif text-xl text-btgog-ink" }, title),
        e("p", { key: "d", className: "mt-1 text-btgog-sage" }, desc)
      ])
    ])
  ]);
}

function Footer() {
  return React.createElement("footer", { className: "mt-12 py-10 border-t border-btgog-sand" },
    React.createElement("div", { className: "max-w-6xl mx-auto px-6 text-sm text-btgog-sage flex flex-wrap gap-4 justify-between" }, [
      React.createElement("div", { key: "l" }, "© " + new Date().getFullYear() + " BTGOG"),
      React.createElement("div", { key: "r" }, "Build • Train • Grow • Own • Give")
    ])
  );
}
