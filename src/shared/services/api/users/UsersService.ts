import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface Itasks {
  id: string,
  content: string,
  expiration_date: string,
}

interface IDetalheUser {
  id: number,
  name: string,
  email: string,
  tasks: Array<Itasks>,
}

type TUsersComTotalCount = {
  data: IDetalheUser[];
  totalCount: number,
}

const getAll = async (page = 1, filter = ""): Promise<TUsersComTotalCount | Error> => {
  try {
    const urlRelativa = `/users?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if ( data ) {
      return {
        data,
        totalCount: Number(headers["x-total-count"] || Environment.LIMITE_DE_LINHAS),
      }
    }

    return new Error("Erro ao listar os Usuários.");

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao listar os Usuários.");
  }
};

const getById = async (id: number,): Promise<IDetalheUser | Error> => {
  try {
    const { data } = await Api.get(`/users/${id}`);

    if ( data ) {
      return data;
    }

    return new Error("Erro ao buscar o Usuário.");

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao buscar o Usuário.");
  }
};

const create = async (dados: Omit<IDetalheUser, 'id'&'tasks'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheUser>("/users", dados);

    if ( data ) {
      return data.id;
    }

    return new Error("Erro ao criar o Usuário.");

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao criar o Usuário.");
  }
};

const updateById = async (id: number, dados: Omit<IDetalheUser, 'tasks'>): Promise<void | Error> => {
  try {
    await Api.put(`/users/${id}`, dados);

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao atualizar o Usuário.");
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/users/${id}`);

  } catch (error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Erro ao deletar o Usuário.");
  }
};

export const UsersService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};