import tornado.ioloop
import tornado.web
import requests
import json
import pymysql
import smtplib, ssl
import random
import decimal
import jwt
import datetime
from services import *


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Authorization,x-requested-with, Content-Type, X-Rapidapi-Key")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def options(self):
        self.set_status(204)
        self.finish()
    
class create_cd_account(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        person_id=data.get("personid")
        print("id",person_id)
        cd_term=data.get("selectedterm")
        print(cd_term)
        # account_number=""
        s=''
        for i in range(10):
            s+=str(random.randint(0,9))
        cd_number=s
        balance=data.get("amount")
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql="INSERT INTO CD_ACCOUNTS (person_id, cd_term, cd_number, balance) VALUES (%s, %s, %s, %s);"
            res=cursor.execute(sql,(person_id,cd_term,cd_number,balance))
            # print(res)
        print("entered",cd_number)
        connection.commit()
        connection.close() 
class get_cd_accounts(BaseHandler):
    def get(self):
        response_body={
            "status":"fail",
            "payload":[]
        }
        person_id = self.get_query_argument("id")
        # print(person_id)
        person_id=self.get_argument("id")
        request_data={}
        request_data["service"]="get_cd_with_id"
        request_data["value"]=person_id
        result=get_cd_and_funding_accounts(request_data)
        # print(result)
        if result:
            response_body["status"]="success"
            for i in result['data']:
                i['created_at']=i["created_at"].isoformat() 
                if i['status']=='o':
                        response_body["payload"].append(i)
            self.write(response_body)
class get_funding_accounts(BaseHandler):
    def get(self):
        person_id=self.get_argument("id")
        request_data={}
        request_data["service"]="get_account_with_id"
        request_data["value"]=person_id
        result=get_cd_and_funding_accounts(request_data)
        self.write(result)
class get_cd_rates(BaseHandler):
    def get(self):
        rates={}
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql="select * from cd_rates;"
            cursor.execute(sql)
            rates['data']=cursor.fetchall()
        # print(rates)
        self.write(rates)
        # print
class Close_cd(BaseHandler):
    def get(self):
        print("entered")
        reasons={
                 "data"
                  :[{"id":1,
                  "reason":"need for emergency"
                  },
                  {"id":2,
                  "reason":"want to terminate the plan"
                  },
                  {"id":3,
                  "reason":"not interested"
                  },
                  {"id":4,
                  "reason":"others"
                  }]
                 }
        print(reasons)
        self.write(reasons)
    def post(self):
        data = json.loads(self.request.body)
        request_body={}
        request_body["purpose"]="for_closing"
        request_body["from_account_number"]=data.get("from_account")
        request_body["to_account_number"]=data.get("selectedaccount")
        request_body["amount"]=data.get("amount")
        print("from core",request_body)
        tranfer_amount(request_body)
        # print(result)
        # connection = get_db_connection()
        # with connection.cursor() as cursor:
        #     sql1= "UPDATE  accounts set balance=balance+%s WHERE account_number=%s;"
        #     sql2="UPDATE cd_accounts SET balance =%s ,status =%s  WHERE cd_number = %s;"
        #     cursor.execute(sql1,(transfer_balance,to_account_number))
        #     cursor.execute(sql2,(0,"c",from_account_number))
        # connection.commit()
        # connection.close() 
        # print(from_account_number,to_account_number)
        # self.write(from_account_number)
class Fundcd(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        request_body={}
        request_body["purpose"]="for_funding"
        request_body["from_account_number"]=data.get("from_account")
        request_body["to_account_number"]=data.get("selectedaccount")
        request_body["amount"]=data.get("amount")
        # accounts_request["service"]="get_account_with_number";accounts_request["value"]=from_account_number
        # certificates_request["service"]="get_cd_with_number";certificates_request["value"]=to_account_number
        # request_data["value"]=from_account_number   
        # result=get_cd_and_funding_accounts(accounts_request)
        # print(result)




def make_app():
    print("entered into make app")
    return tornado.web.Application([
        ("/get_cd_accounts",get_cd_accounts), 
        ("/create_account",create_cd_account),
        ('/get_funding_accounts',get_funding_accounts),
        ('/get_cd_rates',get_cd_rates),
        ('/close_cd',Close_cd),
        ('/fund_cd',Fundcd)
    ])

if __name__ == "__main__":
    print("entered into main")
    app = make_app()
    app.listen(3003)
    tornado.ioloop.IOLoop.current().start()
        