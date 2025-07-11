import { API_URL } from "@/src/constants/constants";
import { IContenidoAudiovisual } from "@/src/data/contenidoAudiovisual";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { IGeneroContenidoAudiovisual } from "@/src/data/generosContenidoAudiovisual";

export async function getContenidos(): Promise<IContenidoAudiovisual[]> {
  const res = await fetch(`${API_URL}/contenidos`);
  if (!res.ok) {
    console.error("DETAILS:", await res.text());
    throw new Error(`Error ${res.status} al obtener contenidos`);
  }
  const json = await res.json();
  return json;
}

export async function getTipos(): Promise<ITipoContenidoAudiovisual[]> {
  const responseTipos = await fetch(`${API_URL}/tipos`);
  if (!responseTipos.ok) {
    throw new Error("Error al obtener tipos");
  }
  const tipos: ITipoContenidoAudiovisual[] = await responseTipos.json();
  return tipos;
}

export async function getGeneros(): Promise<IGeneroContenidoAudiovisual[]> {
  const responseGeneros = await fetch(`${API_URL}/generos`);
  if (!responseGeneros.ok) {
    throw new Error("Error al obtener generos");
  }
  const generos: IGeneroContenidoAudiovisual[] = await responseGeneros.json();
  return generos;
}

export type ITiposDict = Record<number, ITipoContenidoAudiovisual>;