import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Business: Приём заявок на сотрудничество HERO RUSSIA и сохранение их в базу данных
    Args: event с httpMethod, body (JSON: vk, phone, nick, role, reason)
          context - объект с request_id
    Returns: HTTP-ответ со статусом заявки
    '''
    method: str = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body_data = json.loads(event.get('body', '{}'))
    vk = str(body_data.get('vk', '')).strip()
    phone = str(body_data.get('phone', '')).strip()
    nick = str(body_data.get('nick', '')).strip()
    role = str(body_data.get('role', '')).strip()
    reason = str(body_data.get('reason', '')).strip()

    if not vk or not phone or not nick or not role or not reason:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Заполните все поля'}),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO applications (vk, phone, nick, role, reason) "
        "VALUES (%s, %s, %s, %s, %s) RETURNING id",
        (vk, phone, nick, role, reason),
    )
    app_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'success': True,
            'id': app_id,
            'message': 'Ожидайте принятия',
        }),
        'isBase64Encoded': False,
    }
