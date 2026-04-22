/** Limite de renda per capita (soma dos rendimentos ÷ moradores), em reais — manter alinhado ao Backend. */
export const RENDA_PER_CAPITA_LIMITE_REAIS = 810.5;

/** Percentual de vagas em ampla concorrência. `null` = texto sem número. */
export const ENROLLMENT_AMPLA_CONCORRENCIA_VAGAS_PERCENT: number | null = null;

export function formatLimiteRendaPerCapita(): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(RENDA_PER_CAPITA_LIMITE_REAIS);
}

export function amplaConcorrenciaVagasPhrase(): string {
  if (ENROLLMENT_AMPLA_CONCORRENCIA_VAGAS_PERCENT != null) {
    return `${ENROLLMENT_AMPLA_CONCORRENCIA_VAGAS_PERCENT}% das vagas`;
  }
  return 'parte das vagas';
}
