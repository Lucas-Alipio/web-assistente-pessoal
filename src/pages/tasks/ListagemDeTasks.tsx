import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { FerramentasDaListagem } from "../../shared/components";
import { BaseLayoutPage } from "../../shared/layouts";



export const ListagemDeTasks: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  return(
    <BaseLayoutPage 
      titulo="Tasks Control" 
      barraDeFerramentas={(
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={search}
          textoBotaoNovo="Nova"
          aoMudarTextoDeBusca={text => setSearchParams({search: text}, {replace: true})}
        />
      )}
    >
    </BaseLayoutPage>
  );
};