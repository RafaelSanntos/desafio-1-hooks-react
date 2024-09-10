import { useState, useEffect } from "react";

function NewsUpdater() {
    const [post, setPost] = useState(null);
    const [postId, setPostId] = useState(1);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const data = await response.json();
            setPost(data);
        };

        fetchPost();

        const intervalId = setInterval(() => {
            setPostId(prevId => (prevId % 100) + 1); // Incrementa o ID da postagem, reiniciando para 1 após 100
            setSeconds(30); // Reseta o cronômetro para 30 segundos
        }, 30000); // Atualiza a cada 30 segundos

        const timerId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds - 1 : 30);
        }, 1000); // Atualiza o cronômetro a cada segundo

        return () => {
            clearInterval(intervalId); // Limpa o intervalo de busca de postagens
            clearInterval(timerId); // Limpa o intervalo do cronômetro
        };
    }, [postId]);

    return (
        <div>
            <h1>Última Notícia</h1>
            {post ? (
                <div>
                    <h2>Título: {post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ) : (
                <p>Carregando notícia...</p>
            )}
            <p>Próxima atualização em: {seconds} segundos</p>
        </div>
    );
}

export default NewsUpdater;
