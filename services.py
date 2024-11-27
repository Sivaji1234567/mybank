import pymysql
# from get_accounts import *
def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='Nueve@123',
        db='bank',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

def get_cd_and_funding_accounts(request):
    # print("entered into this function")
    element=request["service"]
    match element:
        case "get_account_with_id":
            sql = "SELECT  a.account_id,a.account_type,a.account_number,a.balance  FROM accounts a JOIN persons p ON p.person_id = a.person_id WHERE p.person_id = %s;"
        case "get_account_with_number":
            sql="select * from accounts where account_number=%s;"
        case  "get_cd_with_id":
            sql = "SELECT  cd.account_id,cd.cd_term,cd.cd_number,cd.balance,cd.rate,cd.status,cd.created_at  FROM CD_ACCOUNTS cd JOIN persons p ON p.person_id = cd.person_id WHERE p.person_id = %s;"
        case   "get_cd_with_number":
            sql="select * from cd_accounts where account_number=%s;"
    value=request["value"]
    repsonse={}
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(sql,(value))
        repsonse['data']=cursor.fetchall()
        return repsonse      
    connection.close()
def tranfer_amount(request_body):
    print("from services",request_body)
    connection = get_db_connection()
    with connection.cursor() as cursor:
        if request_body["purpose"]=="for_closing":
            sql1= "UPDATE  accounts set balance=balance+%s WHERE account_number=%s;"
            sql2="UPDATE cd_accounts SET balance =balance-%s ,status =%s  WHERE cd_number = %s;"
            cursor.execute(sql1,(request_body["amount"],request_body["to_account_number"]))
            cursor.execute(sql2,(request_body["amount"],"c",request_body["from_account_number"]))
        else:
            sql1= "UPDATE  accounts set balance=balance-%s WHERE account_number=%s;"
            sql2="UPDATE cd_accounts SET balance =balance+%s   WHERE cd_number = %s;"
            cursor.execute(sql1,(request_body["amount"],request_body["from_account_number"]))
            cursor.execute(sql2,(request_body["amount"],request_body["to_account_number"]))
    connection.commit()
    connection.close()
