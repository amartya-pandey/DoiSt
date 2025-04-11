from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import os, json, time

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

BLOG_DIR = "blogs"
os.makedirs(BLOG_DIR, exist_ok=True)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/post.html")
def post():
    return render_template("post.html")

@app.route("/write.html")
def write():
    return render_template("write.html")

@app.route("/api/blogs", methods=["GET"])
def list_blogs():
    files = os.listdir(BLOG_DIR)
    blogs = []
    for file in sorted(files, reverse=True):
        with open(os.path.join(BLOG_DIR, file)) as f:
            post = json.load(f)
            blogs.append({
                "id": post["id"],
                "title": post["title"],
                "date": post["date"],
                "excerpt": post["content"][:100]
            })
    return jsonify(blogs)

@app.route("/api/blogs/<blog_id>", methods=["GET"])
def get_blog(blog_id):
    try:
        with open(os.path.join(BLOG_DIR, f"{blog_id}.json")) as f:
            return jsonify(json.load(f))
    except FileNotFoundError:
        return jsonify({"error": "Blog not found"}), 404

@app.route("/api/blogs", methods=["POST"])
def save_blog():
    data = request.get_json()
    blog_id = str(int(time.time()))
    post = {
        "id": blog_id,
        "title": data["title"],
        "content": data["content"],
        "category": data.get("category", ""),
        "date": time.strftime("%Y-%m-%d %H:%M")
    }
    with open(os.path.join(BLOG_DIR, f"{blog_id}.json"), "w") as f:
        json.dump(post, f)
    return jsonify({"status": "saved", "id": blog_id}), 201

if __name__ == "__main__":
    app.run(debug=True)
