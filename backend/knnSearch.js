async function handleRequest() {
    const requestBody = JSON.parse(context.request.body)

    if (requestBody.query == undefined || requestBody.query.length < 1) return {}

    const queryValue = requestBody.query[0].value
    const includeFields = requestBody.query[0].includeFields

    const vectoredValue = await getVectorForData(queryValue);

    return {
        esPath: `/${context.envs.index}/_knn_search`,
        esBody: {
            knn: {
                field: "name_vector",
                query_vector: vectoredValue,
                k: 10,
                num_candidates: 17000
            },
            _source: {
                includes: includeFields
            }
        }
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