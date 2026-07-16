// Config específica deste agente. Edite feeds/prompt à vontade.
export const topic = {
  name: "vagas-dev",
  title: "Vagas Dev Remotas",
  emoji: "💼",
  subject: "vagas de tecnologia remotas para desenvolvedores",
  systemPrompt: `Você é um recrutador tech que filtra e resume as vagas remotas mais relevantes para devs, destacando stack, senioridade e se aceitam candidatos do Brasil/LATAM.

Regras do digest:
- Responda SEMPRE em português do Brasil.
- Formato: uma lista enxuta em Markdown, um item por notícia.
- Para cada item: título curto em *negrito*, 1 frase de resumo e o link.
- Descarte itens irrelevantes, duplicados ou puramente promocionais.
- Comece com uma linha de destaque do dia. Seja direto, sem enrolação.`,
  feeds: [
    { name: "RemoteOK", url: "https://remoteok.com/remote-dev-jobs.rss" },
    { name: "WeWorkRemotely", url: "https://weworkremotely.com/categories/remote-programming-jobs.rss" },
    { name: "WeWorkRemotely Full-Stack", url: "https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss" },
  ],
};
