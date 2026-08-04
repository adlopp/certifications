// Edita este array para añadir, quitar o modificar certificaciones.
const CERTIFICATIONS = [
  {
    id: "claude-101",
    title: "Claude 101",
    issuer: "Anthropic Education",
    date: "2026-06-23",
    credentialId: "2gm4xwv2uo4o",
    credentialUrl: "https://verify.skilljar.com/c/2gm4xwv2uo4o",
    image: "assets/claude-logo.svg",
    description: "Curso introductorio de Anthropic sobre los fundamentos de Claude."
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    issuer: "Anthropic Education",
    date: "2026-08-03",
    credentialId: "sncscqezusme",
    credentialUrl: "https://verify.skilljar.com/c/sncscqezusme",
    image: "assets/claude-logo.svg",
    description: "Curso de Anthropic sobre el uso de Claude Code."
  },
  {
    id: "big-school-desarrollo-ia",
    title: "Curso de Iniciación al Desarrollo con IA",
    issuer: "BIG school",
    date: "2025-10-15",
    credentialId: "",
    credentialUrl: "assets/big-school-cert.pdf",
    image: "assets/bigschool-logo.svg",
    description: "Certificado de asistencia a las jornadas formativas \"Desarrollo con IA\" de BIG school (6 horas)."
  },
  {
    id: "big-school-desarrollo-ia-agentes",
    title: "Desarrollo con IA: Programa con Agentes",
    issuer: "BIG school",
    date: "2026-06-26",
    credentialId: "",
    credentialUrl: "assets/big-school-agentes.pdf",
    image: "assets/bigschool-logo.svg",
    description: "Certificado de participación en las jornadas formativas \"Desarrollo con IA: Programa con Agentes\" de BIG school (6 horas)."
  },
  {
    id: "li-azure-introduccion",
    title: "Azure: Introducción a la nube de Microsoft",
    issuer: "LinkedIn Learning",
    date: "2025-10-29",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/dd527e7762ebd07176095e60373cd5395aae58e15d835611ec429c649d3bb0fd",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso sobre los fundamentos de Microsoft Azure, impartido por Rodrigo Díaz Concha."
  },
  {
    id: "li-github-programadores",
    title: "GitHub para programadores",
    issuer: "LinkedIn Learning",
    date: "2023-10-27",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/d587aa48f479b2c95ec9a6d6fa76f0f585042c82859be38fa5e97b19c51edec5",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso sobre el uso de GitHub para el desarrollo de software, impartido por Carlos Solís."
  },
  {
    id: "li-java-esencial",
    title: "Java esencial",
    issuer: "LinkedIn Learning",
    date: "2023-10-23",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/621dc17bcfd848bec3d8ab42000bdcd784d48ba673d5581a513464088a142547",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso sobre los fundamentos de programación en Java, impartido por María Puy Arrastia Lana."
  },
  {
    id: "li-net-maui-esencial",
    title: ".NET MAUI esencial",
    issuer: "LinkedIn Learning",
    date: "2023-10-20",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/5f5b37847ab7a8884a1adf7ace6f33f7d18c11c9e940239ffc272fd3bb87a393",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso sobre desarrollo multiplataforma con .NET MAUI, impartido por Rodrigo Díaz Concha."
  },
  {
    id: "li-csharp-trucos",
    title: "C#: Trucos",
    issuer: "LinkedIn Learning",
    date: "2023-10-18",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/34b0db83b2f478a25a16bf87fffca0d45ffbdf824d7f62c5e71204b293578704",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso sobre técnicas de optimización y rendimiento en C#, impartido por Noemí León."
  },
  {
    id: "li-csharp-avanzado-1",
    title: "C# avanzado 1",
    issuer: "LinkedIn Learning",
    date: "2023-10-14",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/72450fe17e664e9129d461ef529aace19b509377feed46687795522b8ba550f3",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso avanzado de C# (parte 1), impartido por Noemí León."
  },
  {
    id: "li-csharp-avanzado-2",
    title: "C# avanzado 2",
    issuer: "LinkedIn Learning",
    date: "2023-10-09",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/6c83621b94ae0c45a40c49995ce1b79e2bc75606b5265dfc62f4fa047cfa376f",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso avanzado de C# (parte 2), impartido por Noemí León."
  },
  {
    id: "li-csharp-esencial-2020",
    title: "C# esencial (2020)",
    issuer: "LinkedIn Learning",
    date: "2023-10-06",
    credentialId: "",
    credentialUrl: "https://www.linkedin.com/learning/certificates/627e357b7a9de6f2f8d962f90fd919c6c662ab4e77acf266b439364e338cc09b",
    image: "assets/linkedin-learning-logo.svg",
    description: "Curso sobre los fundamentos de C#, impartido por Noemí León."
  }
];
