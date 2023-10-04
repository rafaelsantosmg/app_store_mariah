#!/bin/bash
printf "\n> Instalando as dependencias\n"
yarn

printf "\n> Instalando o back-end\n"
cd ./backend
yarn

printf "\n> Instalando o front-end\n"
cd ../frontend
yarn


printf "\n> Iniciando Projeto\n"
cd ../
yarn start
