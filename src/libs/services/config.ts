import axios from 'axios';

export const TeleService = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL_ENTRYPOINT });