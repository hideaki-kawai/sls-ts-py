import json


def hello(event, context):
    # イベントからデータを取得
    body = json.loads(event['body'])
    name = body['name']

    # レスポンスの作成
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "message": f"Hello {name}, This is Python handler!"
        })
    }

    return response
