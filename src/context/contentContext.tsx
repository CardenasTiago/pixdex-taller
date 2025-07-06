// ContentProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IContenidoAudiovisual } from '@/src/data/contenidoAudiovisual';
import { ITipoContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';
import { IGeneroContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import { getContenidos, getTipos, getGeneros, ITiposDict } from '@/src/services/servicios';

// Nuevo tipo agrupado
type ContenidosPorTipo = Record<number, IContenidoAudiovisual[]>;

interface ContentContextType {
  contenidos: ContenidosPorTipo;
  tipos: ITipoContenidoAudiovisual[];
  generos: IGeneroContenidoAudiovisual[];
  tiposDict: ITiposDict;
  refreshAll: () => Promise<void>;
}

// Crear el contexto
const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [contenidos, setContenidos] = useState<ContenidosPorTipo>({});
  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [generos, setGeneros] = useState<IGeneroContenidoAudiovisual[]>([]);
  const [tiposDict, setTiposDict] = useState<ITiposDict>({});

const loadContenidos = async () => {
  const data = await getContenidos(); 
  const agrupado: ContenidosPorTipo = data.reduce((acc, item) => {
    if (!acc[item.tipoId]) acc[item.tipoId] = [];
    acc[item.tipoId].push(item);
    return acc;
  }, {} as ContenidosPorTipo);
  setContenidos(agrupado);
};

  const loadTipos = async () => {
    const data = await getTipos();
    setTipos(data);
    const dict = data.reduce((acc, tipo) => {
      acc[tipo.id] = tipo;
      return acc;
    }, {} as ITiposDict);
    setTiposDict(dict);
  };

  const loadGeneros = async () => {
    const data = await getGeneros();
    setGeneros(data);
  };

  const refreshAll = async () => {
    await Promise.all([loadContenidos(), loadTipos(), loadGeneros()]);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <ContentContext.Provider value={{ contenidos, tipos, generos, tiposDict, refreshAll }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent debe ser usado dentro de un ContentProvider');
  }
  return context;
};
