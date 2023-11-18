import getCrudifulAxios from './axios_config';
import { AxiosResponse } from 'axios';

export type Article = {
    article_id: number;
    title: string;
    content: string;
}

export type ArticleSchema = {
    title: string,
    content: string
}

type GetArticleResponse = {
    data: Article[];
}

export async function createArticle(article: ArticleSchema) {
    const path = 'articles';
    return await getCrudifulAxios().post<null>(path, article);
}

export async function getArticles() {
    const path = 'articles';
    return await getCrudifulAxios().get<null, AxiosResponse<GetArticleResponse>>(path);
}

export async function deleteArticle(article_id :number) {
    const path = `articles/${article_id}`;
    return await getCrudifulAxios().delete<null>(path);
}

export async function editArticle(article_id :number, article: ArticleSchema) {
    const path = `articles/${article_id}`;
    return await getCrudifulAxios().put<null>(path, article);
}