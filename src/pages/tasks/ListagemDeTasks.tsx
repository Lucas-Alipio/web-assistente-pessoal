import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  IDetalheUser,
  UsersService,
} from "../../shared/services/api/users/UsersService";
import { FerramentasDaListagem } from "../../shared/components";
import { BaseLayoutPage } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";

export const ListagemDeTasks: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce();

  const [rows, setRows] = useState<IDetalheUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      UsersService.getAll(1, search).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [search]);

  return (
    <BaseLayoutPage
      titulo="Tasks Control"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={search}
          textoBotaoNovo="Nova"
          aoMudarTextoDeBusca={(text) =>
            setSearchParams({ search: text }, { replace: true })
          }
        />
      }
    >
      <TableContainer component={Paper} variant="outlined" sx={{m: 1, width: "auto"}}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Data Limite</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate"/>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>

        </Table>
      </TableContainer>
    </BaseLayoutPage>
  );
};
