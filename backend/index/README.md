# Index

## Mapping

The index needs to have a mapping for the `lyric_data` field so that ElasticSearch knows that we are storing vector data in this field.

We can set the mapping by the following JSON:

```json
{
    "mapping": {
        "properties": {
            "lyric_vector": {
                "type": "dense_vector",
                "dims": 1024,
                "index": true,
                "similarity": "cosine"
            }
        }
    }
}
```