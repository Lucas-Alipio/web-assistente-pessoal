import { FerramentasDaListagem } from "../../shared/components";
import { BaseLayoutPage } from "../../shared/layouts";


export const Dashboard = () => {


  return(
    <BaseLayoutPage 
      titulo="Dashboard" 
      barraDeFerramentas={(
        <FerramentasDaListagem
          mostrarInputBusca
        />
      )}
    >
      Testando again
    </BaseLayoutPage>
  );
};