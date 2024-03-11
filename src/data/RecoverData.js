import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getAPI = async (endpoint) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: builder => ({
    getAllData: builder.query({
      query: () => "pokemon",
    }),
    getPokemon: builder.query({
      query: id => `pokemon/${id}`,
    }),
    getSpecies: builder.query({
      query: id => `pokemon-species/${id}`,
    }),
    getGender: builder.query({
      query: id => `gender/${id}`,
    }),
  }),
});


export const {
  useGetPokemonQuery,
  useGetAllDataQuery,
  useGetSpeciesQuery,
  useGetGenderQuery,
} = pokemonApi;