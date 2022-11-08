import { BarraDeFerramentas } from "../../shared/components";
import { BaseLayoutPage } from "../../shared/layouts";


export const Dashboard = () => {


  return(
    <BaseLayoutPage 
      titulo="Dashboard" 
      barraDeFerramentas={(
        <BarraDeFerramentas
          mostrarInputBusca
        />
      )}
    >
      Testando again
    </BaseLayoutPage>
  );
};