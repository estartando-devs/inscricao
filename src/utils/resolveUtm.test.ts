import { describe, expect, it } from "vitest";
import { resolveUtm } from "./resolveUtm";

describe("resolveUtm", () => {
  it("usa utm_source e utm_medium da URL quando ambos presentes (URL tem prioridade)", () => {
    expect(
      resolveUtm(
        "?utm_source=ig&utm_medium=cpc",
        "https://www.instagram.com/",
      ),
    ).toEqual({ utmSource: "ig", utmMedium: "cpc" });
  });

  it("usa utm_source da URL e preenche utm_medium pelo referrer quando so source veio na URL", () => {
    expect(
      resolveUtm("?utm_source=email", "https://www.instagram.com/"),
    ).toEqual({ utmSource: "email", utmMedium: "social" });
  });

  it("infere source e medium quando o referrer e instagram.com", () => {
    expect(resolveUtm("", "https://www.instagram.com/")).toEqual({
      utmSource: "instagram",
      utmMedium: "social",
    });
  });

  it("infere source e medium quando o referrer e o redirecionador l.instagram.com", () => {
    expect(
      resolveUtm("", "https://l.instagram.com/?u=https%3A%2F%2Fexemplo.com"),
    ).toEqual({ utmSource: "instagram", utmMedium: "social" });
  });

  it("infere source=linkedin e medium=social para www.linkedin.com", () => {
    expect(resolveUtm("", "https://www.linkedin.com/")).toEqual({
      utmSource: "linkedin",
      utmMedium: "social",
    });
  });

  it("infere source=google e medium=organic para busca do Google", () => {
    expect(
      resolveUtm("", "https://www.google.com/search?q=estartando+devs"),
    ).toEqual({ utmSource: "google", utmMedium: "organic" });
  });

  it("retorna ambos undefined quando referrer vazio e sem UTM", () => {
    expect(resolveUtm("", "")).toEqual({
      utmSource: undefined,
      utmMedium: undefined,
    });
  });

  it("retorna ambos undefined quando referrer e invalido", () => {
    expect(resolveUtm("", "lixo")).toEqual({
      utmSource: undefined,
      utmMedium: undefined,
    });
  });

  it("retorna ambos undefined para host desconhecido (sem referral generico)", () => {
    expect(resolveUtm("", "https://algumblog.com/post/abc")).toEqual({
      utmSource: undefined,
      utmMedium: undefined,
    });
  });
});
