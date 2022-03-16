function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    if (requestBody.query == undefined || requestBody.query.length < 1) return {}

    const queryValue = requestBody.query[0].value
    const includeFields = requestBody.query[0].includeFields

    return {
        esPath: `/${context.envs.index}/_search`,
        esBody: {
            query: {
                match: {
                    Lyric: {
                        query: queryValue
                    }
                }
            },
            _source: {
                includes: includeFields
            }
        }
    }
}