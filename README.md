# e-Auction Application with Django & React

This project's main purpose is online auction. Users can list products for sale, place live bids to purchase products in this project. In this project used predominantly Django RestFramework and React.

This project was undertaken as a self-improvement initiative, aimed at learning and implementing new technologies. If you identify any errors or areas for improvement within the project, please feel free to reach out to me. I am open to code reviews and appreciate any suggestions that can contribute to my personal development and enhance my skills.

## Live Test

You can live test from [here!](https://nidea1.com.tr)

```python
testaccount@eauction.com
123
```

- Frontend deployed via [Netlify.](https://www.netlify.com)
- Backend deployed via [AWS EC2.](https://aws.amazon.com/ec2/)
- There may be minor errors or bugs, I continue to develop.
##### If you found any error or bug please contact with me.

## Local Usage
```bash
git clone https://github.com/nidea1/e-Auction.git
cd e-Auction

python -m venv myenv
myenv\scripts\activate

# BACKEND
cd backend
pip install -r requirements.txt
# !!! don't forgot to edit os.environ.get lines

py manage.py makemigrations
py manage.py migrate
py manage.py runserver # -> 127.0.0.1:8000

# FRONTEND
cd frontend
npm start # -> 127.0.0.1:3000
```

## Screenshots

![img1](https://cdn.discordapp.com/attachments/1035852765756411995/1117845844398444594/image.png)
![img2](https://cdn.discordapp.com/attachments/1035852765756411995/1117845778719842455/image.png)
![img9](https://cdn.discordapp.com/attachments/1035852765756411995/1120343199555264584/image.png)
![img10](https://cdn.discordapp.com/attachments/1035852765756411995/1118932173672677498/image.png)
![img11](https://cdn.discordapp.com/attachments/1035852765756411995/1120343338890047618/image.png)
![img12](https://cdn.discordapp.com/attachments/1035852765756411995/1120734141437198447/image.png)
![img13](https://cdn.discordapp.com/attachments/1035852765756411995/1120734374296567941/image.png)
![img19](https://cdn.discordapp.com/attachments/1035852765756411995/1121455891904999506/image.png)
![img20](https://cdn.discordapp.com/attachments/1035852765756411995/1121455970900508712/image.png)
![img21](https://cdn.discordapp.com/attachments/1035852765756411995/1121718891660443720/image.png)
![img22](https://cdn.discordapp.com/attachments/1035852765756411995/1121718962900717620/image.png)
![img23](https://cdn.discordapp.com/attachments/1035852765756411995/1121792050191421560/image.png)
![img24](https://cdn.discordapp.com/attachments/1035852765756411995/1121798735928766616/image.png)

