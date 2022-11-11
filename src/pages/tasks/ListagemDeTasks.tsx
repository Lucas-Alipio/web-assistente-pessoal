import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
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
  const navigate = useNavigate();

  const [rows, setRows] = useState<IDetalheUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      UsersService.getAll(page, search).then((result) => {
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
  }, [search, page]);


  const handleDelete = (id: number) => {
    
    if (window.confirm("Realmente deseja apagar?")) {
      UsersService.deleteById(id)
        .then(result => {
          if(result instanceof Error) {
            window.alert(result.message);
          } else {
            setRows(oldRows => [
              ...oldRows.filter(oldRow => oldRow.id !== id),
            ]);
            window.alert("Registro Apagado com sucesso!");
          }
        });
    }
  };

  return (
    <BaseLayoutPage
      titulo="Tasks Control"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={search}
          textoBotaoNovo="Nova"
          aoMudarTextoDeBusca={(text) =>
            setSearchParams({ search: text, page: '1' }, { replace: true })
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
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => navigate(`/task/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>

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

            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                    <Pagination
                      page={page}
                      count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                      onChange={(_, newPage) => setSearchParams(
                          { search, page: newPage.toString()}, 
                          {replace: true}
                      )}
                    />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>

        </Table>
      </TableContainer>
    </BaseLayoutPage>
  );
};
