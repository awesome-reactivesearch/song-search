function handleRequest() {
    const requestBody = JSON.parse(context.request.body);

    if (requestBody.query == undefined || requestBody.query.length < 1) return {}

    var queryValue = undefined;
    requestBody.query.every(q => {
        if (q.value != undefined) {
            queryValue = q.value;
            return false;
        }
        return true;
    })

    const includeFields = requestBody.query[0].includeFields
    const ids = requestBody.query.map(q => q.id);

    const queryToPass = {
        match: {
            Lyric: {
                query: queryValue
            }
        }
    }

    if (queryValue == undefined) {
        queryToPass = {
            match_all: {}
        }
    }

    return {
        esPath: `/${context.envs.index}/_search`,
        esBody: {
            query: queryToPass,
            _source: {
                includes: includeFields
            }
        },
        queryIds: ids
    }
}