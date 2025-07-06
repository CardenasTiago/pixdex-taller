import { contenidosAudiovisuales } from '@/src/data/contenidoAudiovisual';

export function GET() {
  return Response.json(contenidosAudiovisuales);
}