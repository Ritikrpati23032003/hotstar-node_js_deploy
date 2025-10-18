
Hotstar 3-Tier Architecture Deployment

This repository describes the deployment of a Hotstar clone using a 3-tier architecture with AWS services, including EC2, RDS, Load Balancer, CloudFront, and Route 53.

Architecture Overview

Frontend (Presentation Layer)

Runs on port 80.

Hosted on Apache HTTP server.

Built with Node.js (hotstar-sparkle project).

Served through CloudFront.

Backend (Application Layer)

Runs on port 5000.

Developed with Flask and connects to RDS.

Retrieves database credentials from AWS Secrets Manager.

Exposed via Application Load Balancer.

Database Layer

Hosted on AWS RDS (MySQL).

Credentials are managed via AWS Secrets Manager.

Load Balancer & CloudFront

ALB handles traffic for both frontend and backend.

Ports: 443 (HTTPS) configured on ALB.

CloudFront attached to ALB with two origins:

Frontend (path: /*)

Backend (path: /api/*)

Route 53

DNS configured for https://rittik.shop.

Points to CloudFront distribution.

CloudFront Configuration

Origins

Frontend: attached to ALB, path /*

Backend: attached to ALB, path /api/*

Behaviors

Behavior	Path Pattern	HTTP to HTTPS	Origin
Frontend	/*	Redirect	Frontend origin
Backend	/api/*	Redirect	Backend origin

Error Logging

HTTP code: 400

Path: /index.html

Response code: 200

Frontend Deployment

Navigate to the frontend root:

cd hotstar-sparkle


Create .env file:

VITE_API_URL=https://rittik.shop/api


Install Apache HTTP server:

sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd


Install Node.js and dependencies:

sudo yum install nodejs -y
npm install
npm run build


Copy build files to Apache:

cd dist
sudo cp -r * /var/www/html/

Backend Deployment

Attach IAM Policy to backend EC2 instance to access Secrets Manager:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetSecretValue"
            ],
            "Resource": "*"
        }
    ]
}


Install Python dependencies:

sudo yum install python3-pip -y
pip3 install -r requirements.txt


requirements.txt:

Flask
PyMySQL
boto3
flask-cors
bcrypt
python-dotenv


hotstar.py (Flask App Example):

from flask import Flask
from flask_cors import CORS
import boto3
import pymysql
import os

app = Flask(__name__)
# Allow only frontend CloudFront domain
CORS(app, resources={r"/api/*": {"origins": "https://rittik.shop"}})

# RDS Configuration
RDS_ENDPOINT = "hotstar.cglkquyukn4p.us-east-1.rds.amazonaws.com"
DB_NAME = "hotstar"

# AWS Secrets Manager
SECRET_ARN = "arn:aws:secretsmanager:us-east-1:301678011164:secret:rds!db-515dba7b-90e8-4fcf-a56e-240084384555-hq1JbK"
REGION_NAME = "us-east-1"

# Code to fetch secrets and connect to RDS goes here...

DNS & Route53

Create a record in Route 53 pointing to CloudFront distribution.

Use HTTPS for secure connections.

Ports & Target Groups
Target Group	Port	Purpose
Backend	5000	Flask API
Frontend	80	Static Website
