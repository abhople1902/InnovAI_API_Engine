# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# import io
# import os
# # from dotenv import load_dotenv
# import json
# from groq import Groq
# import logging
# import re
# from concurrent.futures import ThreadPoolExecutor, as_completed
# # load_dotenv()
# GROQ_API_KEY = "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"
# # GROQ_API_KEY = os.getenv('GROQ_API_KEY')
# clientGroq = Groq(api_key=GROQ_API_KEY)
# MODELGROQ = "llama3-70b-8192"
# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:54732"}})
# logging.basicConfig(level=logging.INFO)
# OBJECT_CHUNK_SIZE = 20
# MAX_WORKERS = 4


# @app.route('/process_excel', methods=['OPTIONS', 'POST'])
# @cross_origin(origins="http://localhost:54732")
# def process_excel():
#     # Your existing code...
#     pass

# @app.route('/test_cors', methods=['GET'])
# def test_cors():
#     return jsonify({"message": "CORS is working!"})


# def chunk_data(data, chunk_size):
#     chunks = []
#     for i in range(0, len(data), chunk_size):
#         chunk = data[i:i + chunk_size]
#         chunks.append(chunk)
#     app.logger.info(f'Number of chunks: {len(chunks)}')
#     return chunks
# def clean_json_string(s):
#     s = s.strip()
#     s = re.sub(r'^```json\s*', '', s)
#     s = re.sub(r'\s*```$', '', s)
#     s = re.sub(r'(\w+)(?=\s*:)', r'"\1"', s)
#     s = s.replace("'", '"')
#     # Ensure proper comma placement
#     s = re.sub(r'\}(?=\s*\{)', '},', s)
#     return s
# def process_chunk(chunk, prompt):
#     chunk_json_str = json.dumps(chunk)
#     try:
#         chat_completion = clientGroq.chat.completions.create(
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant. Your response must be a valid JSON object or array. Do not include any explanatory text outside of the JSON structure. Ensure that the number of items in your response matches the number of items in the input."},
#                 {"role": "user", "content": prompt},
#                 {"role": "user", "content": chunk_json_str}
#             ],
#             model=MODELGROQ
#         )
#         response_text = chat_completion.choices[0].message.content
#         app.logger.info(f'Raw Response Text: {response_text}')
#         cleaned_response = clean_json_string(response_text)
#         app.logger.info(f'Cleaned Response Text: {cleaned_response}')
#         response_json = json.loads(cleaned_response)
#         return response_json
#     except json.JSONDecodeError as json_err:
#         app.logger.error(f'Failed to parse response as JSON: {str(json_err)}')
#         app.logger.error(f'Problematic JSON String: {cleaned_response}')
#         return {"parse_error": str(json_err)}
#     except Exception as e:
#         app.logger.error(f"Error processing chunk: {str(e)}")
#         return {"error": str(e)}
# def validate_language(language):
#     """Validate if the language is recognized."""
#     prompt = f"Please check if '{language}' is a valid language. Respond with 'yes' or 'no'."
#     try:
#         chat_completion = clientGroq.chat.completions.create(
#             messages=[
#                 {"role": "system", "content": "You are a helpful assistant. Your response must be 'yes' or 'no'."},
#                 {"role": "user", "content": prompt}
#             ],
#             model=MODELGROQ
#         )
#         response_text = chat_completion.choices[0].message.content.strip().lower()
#         app.logger.info(f'Language Validation Response: {response_text}')
#         return response_text == 'yes'
#     except Exception as e:
#         app.logger.error(f"Error validating language: {str(e)}")
#         return False
# @app.route('/process_excel', methods=['POST'])
# def process_excel():
#     try:
#         file = request.files.get('file')
#         language = request.form.get('language')
#         if not file or file.filename == '':
#             return jsonify({"error": "No file part or no selected file"}), 400
#         if not language:
#             return jsonify({"error": "Language is required"}), 400
#         if not validate_language(language):
#             return jsonify({"error": "Please enter the correct language"}), 200
#         prompt = f"In this JSON data translate the 'Source[EN]' field to {language} and store the result of each in 'English (India) - Draft' give me in proper JSON format. IMPORTANT:- The Translations is for people in oil and chemical industry do the translation by keeping this in mind"
#         if file and file.filename.endswith('.xlsx'):
#             df = pd.read_excel(io.BytesIO(file.read()))
#             data = df.to_dict('records')
#             chunks = chunk_data(data, OBJECT_CHUNK_SIZE)
#             final_result = []
#             with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
#                 futures = [executor.submit(process_chunk, chunk, prompt) for chunk in chunks]
#                 for future in as_completed(futures):
#                     result = future.result()
#                     if isinstance(result, list):
#                         final_result.extend(result)
#                     else:
#                         final_result.append(result)
#             return jsonify({"result": final_result, "result_length": len(final_result)})
#         else:
#             return jsonify({"error": "Invalid file format. Please upload an .xlsx file"}), 400
#     except Exception as e:
#         app.logger.error(f"Error in process_excel: {str(e)}")
#         return jsonify({"error": "An internal error occurred", "details": str(e)}), 500
# @app.route('/', methods=['GET'])
# def home():
#     return "Welcome to the Excel to JSON API. Use POST /process_excel to upload an Excel file and process the data."
# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import io
import json
import logging
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from groq import Groq

# Initialize Flask application
app = Flask(__name__)

# Configure CORS to allow requests from a specific origin
CORS(app, resources={r"/*": {"origins": "http://localhost:54732"}}) #54732

# Configure logging
logging.basicConfig(level=logging.INFO)

# Define constants
OBJECT_CHUNK_SIZE = 20
MAX_WORKERS = 4
GROQ_API_KEY = "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"
MODELGROQ = "llama3-70b-8192"

# Initialize Groq client
clientGroq = Groq(api_key=GROQ_API_KEY)

def chunk_data(data, chunk_size):
    chunks = []
    for i in range(0, len(data), chunk_size):
        chunk = data[i:i + chunk_size]
        chunks.append(chunk)
    app.logger.info(f'Number of chunks: {len(chunks)}')
    return chunks

def clean_json_string(s):
    s = s.strip()
    s = re.sub(r'^```json\s*', '', s)
    s = re.sub(r'\s*```$', '', s)
    s = re.sub(r'(\w+)(?=\s*:)', r'"\1"', s)
    s = s.replace("'", '"')
    s = re.sub(r'\}(?=\s*\{)', '},', s)
    return s

def process_chunk(chunk, prompt):
    chunk_json_str = json.dumps(chunk)
    try:
        chat_completion = clientGroq.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Your response must be a valid JSON object or array. Do not include any explanatory text outside of the JSON structure. Ensure that the number of items in your response matches the number of items in the input."},
                {"role": "user", "content": prompt},
                {"role": "user", "content": chunk_json_str}
            ],
            model=MODELGROQ
        )
        response_text = chat_completion.choices[0].message.content
        app.logger.info(f'Raw Response Text: {response_text}')
        cleaned_response = clean_json_string(response_text)
        app.logger.info(f'Cleaned Response Text: {cleaned_response}')
        response_json = json.loads(cleaned_response)
        return response_json
    except json.JSONDecodeError as json_err:
        app.logger.error(f'Failed to parse response as JSON: {str(json_err)}')
        app.logger.error(f'Problematic JSON String: {cleaned_response}')
        return {"parse_error": str(json_err)}
    except Exception as e:
        app.logger.error(f"Error processing chunk: {str(e)}")
        return {"error": str(e)}

def validate_language(language):
    prompt = f"Please check if '{language}' is a valid language. Respond with 'yes' or 'no'."
    try:
        chat_completion = clientGroq.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant. Your response must be 'yes' or 'no'."},
                {"role": "user", "content": prompt}
            ],
            model=MODELGROQ
        )
        response_text = chat_completion.choices[0].message.content.strip().lower()
        app.logger.info(f'Language Validation Response: {response_text}')
        return response_text == 'yes'
    except Exception as e:
        app.logger.error(f"Error validating language: {str(e)}")
        return False

@app.route('/process_excel', methods=['POST'])
def process_excel():
    try:
        file = request.files.get('file')
        language = request.form.get('language')
        if not file or file.filename == '':
            return jsonify({"error": "No file part or no selected file"}), 400
        if not language:
            return jsonify({"error": "Language is required"}), 400
        if not validate_language(language):
            return jsonify({"error": "Please enter the correct language"}), 200

        prompt = f"In this JSON data translate the 'Source[EN]' field to {language} and store the result of each in 'English (India) - Draft' give me in proper JSON format. IMPORTANT:- The Translations is for people in oil and chemical industry do the translation by keeping this in mind"

        if file and file.filename.endswith('.xlsx'):
            df = pd.read_excel(io.BytesIO(file.read()))
            data = df.to_dict('records')
            chunks = chunk_data(data, OBJECT_CHUNK_SIZE)
            final_result = []
            with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
                futures = [executor.submit(process_chunk, chunk, prompt) for chunk in chunks]
                for future in as_completed(futures):
                    result = future.result()
                    if isinstance(result, list):
                        final_result.extend(result)
                    else:
                        final_result.append(result)
            return jsonify({"result": final_result, "result_length": len(final_result)})
        else:
            return jsonify({"error": "Invalid file format. Please upload an .xlsx file"}), 400
    except Exception as e:
        app.logger.error(f"Error in process_excel: {str(e)}")
        return jsonify({"error": "An internal error occurred", "details": str(e)}), 500

@app.route('/test_cors', methods=['GET'])
def test_cors():
    return jsonify({"message": "CORS is working!"})

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Excel to JSON API. Use POST /process_excel to upload an Excel file and process the data."

if __name__ == '__main__':
    app.run(debug=True)
