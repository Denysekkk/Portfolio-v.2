from flask import Flask, request
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <form action="/send" method="POST">
        <input name="name" placeholder="Name"><br>
        <input name="email" placeholder="Email"><br>
        <textarea name="message"></textarea><br>
        <button type="submit">Send</button>
    </form>
    '''

@app.route('/send', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    msg = MIMEText(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")
    msg['Subject'] = 'New Contact Form Submission'
    msg['From'] = 'twojemail@gmail.com'
    msg['To'] = 'denyssyvak501@gmail.com'

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login('twojemail@gmail.com', 'HASLO_APLIKACJI')
    server.send_message(msg)
    server.quit()
    server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASSWORD"))
    
    return 'Message sent successfully!'

if __name__ == '__main__':
    app.run(debug=True)