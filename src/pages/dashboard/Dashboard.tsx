import { FerramentasDeDetalhe } from "../../shared/components";
import { BaseLayoutPage } from "../../shared/layouts";


export const Dashboard = () => {


  return(
    <BaseLayoutPage 
      titulo="Dashboard" 
      barraDeFerramentas={(
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEFechar
        />
      )}
    >
      Testando again
    </BaseLayoutPage>
  );
};