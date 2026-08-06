// Edita este array para añadir, quitar o modificar certificaciones.
// title y description son bilingües: { es: "...", en: "..." }
const CERTIFICATIONS = [
  {
    id: "claude-101",
    title: { es: "Claude 101", en: "Claude 101" },
    issuer: "Anthropic Education",
    date: "2026-06-23",
    credentialId: "2gm4xwv2uo4o",
    credentialUrl: "https://verify.skilljar.com/c/2gm4xwv2uo4o",
    image: "assets/claude-logo.svg",
    description: {
      es: "Curso introductorio de Anthropic sobre los fundamentos de Claude.",
      en: "Anthropic's introductory course on the fundamentals of Claude."
    }
  },
  {
    id: "claude-code-101",
    title: { es: "Claude Code 101", en: "Claude Code 101" },
    issuer: "Anthropic Education",
    date: "2026-08-03",
    credentialId: "sncscqezusme",
    credentialUrl: "https://verify.skilljar.com/c/sncscqezusme",
    image: "assets/claude-logo.svg",
    description: {
      es: "Curso de Anthropic sobre el uso de Claude Code.",
      en: "Anthropic's course on using Claude Code."
    }
  },
  {
    id: "claude-cowork-intro",
    title: { es: "Introducción a Claude Cowork", en: "Introduction to Claude Cowork" },
    issuer: "Anthropic Education",
    date: "2026-08-04",
    credentialId: "mnjrqrdcjvab",
    credentialUrl: "https://verify.skilljar.com/c/mnjrqrdcjvab",
    image: "assets/claude-logo.svg",
    description: {
      es: "Curso introductorio de Anthropic sobre Claude Cowork.",
      en: "Anthropic's introductory course on Claude Cowork."
    }
  },
  {
    id: "claude-platform-101",
    title: { es: "Claude Platform 101", en: "Claude Platform 101" },
    issuer: "Anthropic Education",
    date: "2026-08-04",
    credentialId: "q3p5pr9om79p",
    credentialUrl: "https://verify.skilljar.com/c/q3p5pr9om79p",
    image: "assets/claude-logo.svg",
    description: {
      es: "Curso de Anthropic sobre cómo construir aplicaciones con la Claude Platform.",
      en: "Anthropic's course on building applications with the Claude Platform."
    }
  },
  {
    id: "ai-fluency-framework-foundations",
    title: {
      es: "Fluidez en IA: Marco y Fundamentos",
      en: "AI Fluency: Framework & Foundations"
    },
    issuer: "Anthropic Education",
    date: "2026-08-06",
    credentialId: "wejcyjy8xfqn",
    credentialUrl: "https://verify.skilljar.com/c/wejcyjy8xfqn",
    image: "assets/claude-logo.svg",
    description: {
      es: "Curso de Anthropic sobre los fundamentos y el marco de trabajo para el uso fluido de la IA.",
      en: "Anthropic's course on the framework and foundations for AI fluency."
    }
  },
  {
    id: "claude-code-in-action",
    title: { es: "Claude Code en acción", en: "Claude Code in Action" },
    issuer: "Anthropic Education",
    date: "2026-08-04",
    credentialId: "pek4jran2q7x",
    credentialUrl: "https://verify.skilljar.com/c/pek4jran2q7x",
    image: "assets/claude-logo.svg",
    description: {
      es: "Curso de Anthropic sobre el uso práctico de Claude Code.",
      en: "Anthropic's course on the practical use of Claude Code."
    }
  },
  {
    id: "big-school-desarrollo-ia",
    title: {
      es: "Curso de Iniciación al Desarrollo con IA",
      en: "Introduction to AI Development Course"
    },
    issuer: "BIG school",
    date: "2025-10-15",
    credentialId: "",
    credentialUrl: "assets/big-school-cert.pdf",
    image: "assets/bigschool-logo.svg",
    description: {
      es: "Certificado de asistencia a las jornadas formativas \"Desarrollo con IA\" de BIG school (6 horas).",
      en: "Attendance certificate for BIG school's \"AI Development\" training sessions (6 hours)."
    }
  },
  {
    id: "big-school-desarrollo-ia-agentes",
    title: {
      es: "Desarrollo con IA: Programa con Agentes",
      en: "AI Development: Programming with Agents"
    },
    issuer: "BIG school",
    date: "2026-06-26",
    credentialId: "",
    credentialUrl: "assets/big-school-agentes.pdf",
    image: "assets/bigschool-logo.svg",
    description: {
      es: "Certificado de participación en las jornadas formativas \"Desarrollo con IA: Programa con Agentes\" de BIG school (6 horas).",
      en: "Participation certificate for BIG school's \"AI Development: Programming with Agents\" training sessions (6 hours)."
    }
  },
  {
    id: "li-azure-introduccion",
    title: {
      es: "Azure: Introducción a la nube de Microsoft",
      en: "Azure: Introduction to Microsoft Cloud"
    },
    issuer: "LinkedIn Learning",
    date: "2025-10-29",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/dd527e7762ebd07176095e60373cd5395aae58e15d835611ec429c649d3bb0fd",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso sobre los fundamentos de Microsoft Azure, impartido por Rodrigo Díaz Concha.",
      en: "Course on the fundamentals of Microsoft Azure, taught by Rodrigo Díaz Concha."
    }
  },
  {
    id: "li-github-programadores",
    title: { es: "GitHub para programadores", en: "GitHub for Developers" },
    issuer: "LinkedIn Learning",
    date: "2023-10-27",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/d587aa48f479b2c95ec9a6d6fa76f0f585042c82859be38fa5e97b19c51edec5",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso sobre el uso de GitHub para el desarrollo de software, impartido por Carlos Solís.",
      en: "Course on using GitHub for software development, taught by Carlos Solís."
    }
  },
  {
    id: "li-java-esencial",
    title: { es: "Java esencial", en: "Java Essentials" },
    issuer: "LinkedIn Learning",
    date: "2023-10-23",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/621dc17bcfd848bec3d8ab42000bdcd784d48ba673d5581a513464088a142547",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso sobre los fundamentos de programación en Java, impartido por María Puy Arrastia Lana.",
      en: "Course on the fundamentals of Java programming, taught by María Puy Arrastia Lana."
    }
  },
  {
    id: "li-net-maui-esencial",
    title: { es: ".NET MAUI esencial", en: ".NET MAUI Essentials" },
    issuer: "LinkedIn Learning",
    date: "2023-10-20",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/5f5b37847ab7a8884a1adf7ace6f33f7d18c11c9e940239ffc272fd3bb87a393",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso sobre desarrollo multiplataforma con .NET MAUI, impartido por Rodrigo Díaz Concha.",
      en: "Course on cross-platform development with .NET MAUI, taught by Rodrigo Díaz Concha."
    }
  },
  {
    id: "li-csharp-trucos",
    title: { es: "C#: Trucos", en: "C#: Tips and Tricks" },
    issuer: "LinkedIn Learning",
    date: "2023-10-18",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/34b0db83b2f478a25a16bf87fffca0d45ffbdf824d7f62c5e71204b293578704",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso sobre técnicas de optimización y rendimiento en C#, impartido por Noemí León.",
      en: "Course on optimization and performance techniques in C#, taught by Noemí León."
    }
  },
  {
    id: "li-csharp-avanzado-1",
    title: { es: "C# avanzado 1", en: "Advanced C# 1" },
    issuer: "LinkedIn Learning",
    date: "2023-10-14",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/72450fe17e664e9129d461ef529aace19b509377feed46687795522b8ba550f3",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso avanzado de C# (parte 1), impartido por Noemí León.",
      en: "Advanced C# course (part 1), taught by Noemí León."
    }
  },
  {
    id: "li-csharp-avanzado-2",
    title: { es: "C# avanzado 2", en: "Advanced C# 2" },
    issuer: "LinkedIn Learning",
    date: "2023-10-09",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/6c83621b94ae0c45a40c49995ce1b79e2bc75606b5265dfc62f4fa047cfa376f",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso avanzado de C# (parte 2), impartido por Noemí León.",
      en: "Advanced C# course (part 2), taught by Noemí León."
    }
  },
  {
    id: "li-csharp-esencial-2020",
    title: { es: "C# esencial (2020)", en: "C# Essentials (2020)" },
    issuer: "LinkedIn Learning",
    date: "2023-10-06",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/627e357b7a9de6f2f8d962f90fd919c6c662ab4e77acf266b439364e338cc09b",
    image: "assets/linkedin-learning-logo.svg",
    description: {
      es: "Curso sobre los fundamentos de C#, impartido por Noemí León.",
      en: "Course on the fundamentals of C#, taught by Noemí León."
    }
  }
];
