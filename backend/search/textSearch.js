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
    const showHighlight = requestBody.query[0].highlight
    const ids = requestBody.query.map(q => q.id);

    var queryToPass = {
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

    var esBodyToPass = {
        query: queryToPass,
        _source: {
            includes: includeFields
        }
    }

    if (showHighlight) esBodyToPass["highlight"] = {
        fields: {
            Lyric: {}
        }
    }

    return {
        esPath: `/${context.envs.index}/_search`,
        esBody: esBodyToPass,
        queryIds: ids
    }
}