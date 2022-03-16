async function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    const lyricVector = await getVectorForData(requestBody.Lyric);

    return {
        "lyric_vector": lyricVector,
    }
}

async function getVectorForData(data) {
    const url = `${context.envs.bertURL}/encode`;


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: 1,
            texts: [data],
            is_tokenized: false
        })
    });

    const jsonResponse = JSON.parse(response);
    return jsonResponse.result[0];
}