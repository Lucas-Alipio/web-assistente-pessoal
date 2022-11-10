import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { UsersService } from "../../shared/services/api/users/UsersService";
import { FerramentasDaListagem } from "../../shared/components";
import { BaseLayoutPage } from "../../shared/layouts";



export const ListagemDeTasks: React.FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {

    UsersService.getAll(1, search)
    .then((result) => {
      if ( result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);
      }
    })

  }, [search]);

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