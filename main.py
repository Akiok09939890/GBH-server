from flask import Flask, request, redirect, send_from_directory, session, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, template_folder='.', static_folder='.')

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, 'sqlite', 'db.sqlite3')

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_PATH}'
app.config['SECRET_KEY'] = 'super-puper-secret'
db = SQLAlchemy(app)

#создание таблиц
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Cabinet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    nickname = db.Column(db.String(100), default='')
    goals = db.Column(db.String(20), default='')
    fio = db.Column(db.String(200), default='')
    level = db.Column(db.String(20), default='')
    email = db.Column(db.String(100), default='')
    height = db.Column(db.String(20), default='')
    age = db.Column(db.String(20), default='')
    weight = db.Column(db.String(20), default='')
    gender = db.Column(db.String(20), default='')


class Diary(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    trenname = db.Column(db.String(200), default='')
    duration = db.Column(db.String(100), default='')
    pereriv = db.Column(db.String(100), default='')
    day = db.Column(db.String(100), default='')
    trenstart = db.Column(db.String(100), default='')
    zametki = db.Column(db.Text, default='')
    upra = db.Column(db.Text, default='')

# создание всех таблиц идли обновление хз
with app.app_context():
    db.create_all()

# создание динамического правила для скачивания или просмотра файлов
# из определенных папок на серваке и еще проверка на авторизованность пользователя
def serve_dir(dirname, protected=False):
    def inner(filename, dirname=dirname, protected=protected):
        # проверка авторизован ли пользователь
        if protected and 'user_username' not in session:
            return redirect('/sign/sign.html')
        return send_from_directory(os.path.join(BASE_DIR, dirname), filename)
    inner.__name__ = f'serve_{dirname}'
    # используется ручной вызов декодера тк у мя папки кривые
    return app.route(f'/{dirname}/<path:filename>')(inner)


# задаем в какие пользователь может зайти без авторизации а в какие нет
serve_dir('source')
serve_dir('scripts')

# публичные, без авторизации
serve_dir('main')
serve_dir('sign')
serve_dir('reg')
serve_dir('calc')
serve_dir('calcres')
serve_dir('info')
serve_dir('base')
serve_dir('iprunfo')

# защищенные (перенаправляются на reg (через redirect))
serve_dir('cabinet', protected=True)
serve_dir('cabinetchange', protected=True)
serve_dir('diary', protected=True)
serve_dir('diaryadd', protected=True)
serve_dir('podrobnee', protected=True)

# открытие main при заходе на сайт
@app.route('/')
def index():
    return redirect('/main/main.html')

# принимает значения из сайта и закидывает в переменные
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    # обращаемся к таблице бд (first - первый найденный пользователь)
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        session['user_username'] = user.username
        return redirect('/main/main.html')
    return redirect('/sign/sign.html')

# регистрация пользователей принимает данные из формы регистрации, проверяет
# их на ошибки, создаёт новую запись в базе данных и сразу выполняет вход
# для нового пользователя.
@app.route('/register', methods=['POST'])
def register():
    username = request.form.get('username')
    password = request.form.get('password')
    password_confirm = request.form.get('passwordconfirm')
    if not username or not password or password != password_confirm:
        return redirect('/reg/reg.html')
    existing = User.query.filter_by(username=username).first()
    if existing:
        return redirect('/reg/reg.html')
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    session['user_username'] = new_user.username
    return redirect('/main/main.html')

# выход (хз зачем он не реализован на сайте)
@app.route('/logout')
def logout():
    session.pop('user_username', None)
    return redirect('/sign/sign.html')


@app.route('/api/check-auth')
def api_check_auth():
    return jsonify({"authenticated": 'user_username' in session})

# вход с проверками
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Нет данных"}), 400
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        session['user_username'] = user.username
        return jsonify({"success": True, "message": "Успешный вход"}), 200
    return jsonify({"success": False, "message": "Неверный логин или пароль"}), 401

# регистрация еще одна только в виде API
@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Нет данных"}), 400
    username = data.get('username')
    password = data.get('password')
    password_confirm = data.get('passwordconfirm')
    if not username or not password:
        return jsonify({"success": False, "message": "Заполните все поля"}), 400
    if password != password_confirm:
        return jsonify({"success": False, "message": "Пароли не совпадают"}), 400
    existing = User.query.filter_by(username=username).first()
    if existing:
        return jsonify({"success": False, "message": "Пользователь уже существует"}), 400
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    session['user_username'] = new_user.username
    return jsonify({"success": True, "message": "Регистрация успешна"}), 200


@app.route('/api/cabinet/save', methods=['POST'])
def api_cabinet_save():
    if 'user_username' not in session:
        return jsonify({"success": False, "message": "Не авторизован"}), 401
    user = User.query.filter_by(username=session['user_username']).first()
    if not user:
        return jsonify({"success": False, "message": "Пользователь не найден"}), 404
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Нет данных"}), 400
    cabinet = Cabinet.query.filter_by(user_id=user.id).first()
    if not cabinet:
        cabinet = Cabinet(user_id=user.id)
        db.session.add(cabinet)
    cabinet.nickname = data.get('nickname', '')
    cabinet.goals = data.get('goals', '')
    cabinet.fio = data.get('fio', '')
    cabinet.level = data.get('level', '')
    cabinet.email = data.get('email', '')
    cabinet.height = data.get('height', '')
    cabinet.age = data.get('age', '')
    cabinet.weight = data.get('weight', '')
    cabinet.gender = data.get('gender', '')
    db.session.commit()
    return jsonify({"success": True, "message": "Данные сохранены"}), 200


@app.route('/api/cabinet/get', methods=['GET'])
def api_cabinet_get():
    if 'user_username' not in session:
        return jsonify({"success": False, "message": "Не авторизован"}), 401
    user = User.query.filter_by(username=session['user_username']).first()
    if not user:
        return jsonify({"success": False, "message": "Пользователь не найден"}), 404
    cabinet = Cabinet.query.filter_by(user_id=user.id).first()
    if not cabinet:
        return jsonify({"success": True, "data": {}}), 200
    return jsonify({
        "success": True,
        "data": {
            "nickname": cabinet.nickname,
            "goals": cabinet.goals,
            "fio": cabinet.fio,
            "level": cabinet.level,
            "email": cabinet.email,
            "height": cabinet.height,
            "age": cabinet.age,
            "weight": cabinet.weight,
            "gender": cabinet.gender
        }
    }), 200


@app.route('/api/diary/save', methods=['POST'])
def api_diary_save():
    if 'user_username' not in session:
        return jsonify({"success": False, "message": "Не авторизован"}), 401
    user = User.query.filter_by(username=session['user_username']).first()
    if not user:
        return jsonify({"success": False, "message": "Пользователь не найден"}), 404
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Нет данных"}), 400
    diary = Diary(
        user_id=user.id,
        trenname=data.get('trenname', ''),
        duration=data.get('duration', ''),
        pereriv=data.get('pereriv', ''),
        day=data.get('day', ''),
        trenstart=data.get('trenstart', ''),
        zametki=data.get('zametki', ''),
        upra=data.get('upra', '')
    )
    db.session.add(diary)
    db.session.commit()
    return jsonify({"success": True, "message": "Тренировка сохранена"}), 200


@app.route('/api/diary/get', methods=['GET'])
def api_diary_get():
    if 'user_username' not in session:
        return jsonify({"success": False, "message": "Не авторизован"}), 401
    user = User.query.filter_by(username=session['user_username']).first()
    if not user:
        return jsonify({"success": False, "message": "Пользователь не найден"}), 404
    diary = Diary.query.filter_by(user_id=user.id).order_by(Diary.id.desc()).first()
    if not diary:
        return jsonify({"success": True, "data": None}), 200
    return jsonify({
        "success": True,
        "data": {
            "trenname": diary.trenname,
            "duration": diary.duration,
            "pereriv": diary.pereriv,
            "day": diary.day,
            "trenstart": diary.trenstart,
            "zametki": diary.zametki,
            "upra": diary.upra
        }
    }), 200


if __name__ == '__main__':
    app.run(debug=True)
