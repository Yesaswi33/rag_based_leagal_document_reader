.

📘 RAG-Based Legal Document Reader

A Retrieval-Augmented Generation system for legal-domain document understanding.

📝 Overview

This project is a domain-specific RAG (Retrieval-Augmented Generation) application designed for legal document summarization, question-answering, and information extraction.

It allows users to upload legal document images, performs OCR, converts the extracted text into vector embeddings, and uses a vector similarity search system (MongoDB Vector DB / FAISS) to retrieve the most relevant chunks before generating the final answer using Flan-T5 (LLM).

This system supports:

🔍 Summarizing long legal documents

🖼️ OCR-based text extraction from images

🤖 Intelligent legal Q&A

🧠 Domain-specific contextual retrieval

📚 Automatic decision: Answer from uploaded document OR Answer from knowledge base

⚙️ Key Features
🖼️ OCR Based Document Processing

Accepts scanned/legal document images (JPG, PNG).

Uses OCR to extract clean text from images.

📄 Intelligent Text Chunking

Documents are split into ~1000-token chunks for optimal embedding & retrieval.

Handles long documents efficiently.

🧬 Vector Embeddings + MongoDB Vector DB

Each chunk is embedded using an embedding model.

Stored inside MongoDB with vector fields for similarity search.

Supports:

Initial Knowledge Base (pre-loaded legal documents)

User Uploaded Document Chunks

🎯 Smart Query Routing

When the user asks a question, the system checks:

Is the question related to the user's uploaded document?

YES → Retrieve from uploaded-document vectors

NO → Retrieve from the pre-built legal knowledge-base vectors

This ensures accurate, context-aware answers.

🧠 RAG Workflow with Flan-T5

Retrieved chunks are passed along with the user query into Flan-T5.

Generates:

Summaries

Explanations

Answers to legal questions

🌐 Frontend

Upload document interface

Query input field

Displays generated responses clearly

Built to be simple, fast, and user-friendly

🚀 System Architecture
                ┌────────────────┐
                │   Frontend     │
                │  (Image + Q)   │
                └───────┬────────┘
                        │
                        ▼
             ┌────────────────────┐
             │      Backend       │
             │  (FastAPI/Flask)   │
             └───────┬───────────┘
                     │
       ┌─────────────┼──────────────────────┐
       ▼             ▼                      ▼
┌────────────┐  ┌────────────┐      ┌──────────────────┐
│   OCR       │  │ Chunking   │      │ Query Embeddings │
└──────┬──────┘  └────────────┘      └──┬───────────────┘
       │                                 │
       ▼                                 ▼
┌─────────────┐                  ┌────────────────────────┐
│ Embeddings   │                  │ MongoDB Vector Database │
└──────┬──────┘                  │  (KB + User Chunks)     │
       │                          └────────┬──────────────┘
       ▼                                   │
      ┌───────────────────────────┐        ▼
      │ Similarity Search (FAISS) │  Top-K Chunks
      └────────────┬──────────────┘
                   ▼
          ┌──────────────────┐
          │   Flan-T5 LLM    │
          │ (RAG Generation) │
          └───────┬──────────┘
                  ▼
          Final Answer to User

🛠️ Backend Workflow
1️⃣ Initial Knowledge Base Creation
Documents → OCR → Chunking → Embedding → MongoDB Storage

2️⃣ User Upload Flow

User uploads image

OCR extracts text

Text is chunked

Embeddings are generated

Saved temporarily in MongoDB as input_doc_chunks

3️⃣ Query Flow

User enters a question

Question is embedded

System checks similarity:

If highly similar to input document chunks → use these

Else → fallback to knowledge base chunks

Retrieve top-k similar chunks

Feed into Flan-T5 with the query

Return final summarized answer

🧪 Technologies Used
Component	Technology
OCR	Tesseract / EasyOCR
Embeddings	Any sentence/embedding model (e.g., Sentence-Transformers)
Vector Search	MongoDB Vector Search + FAISS
LLM	Flan-T5
Frontend	HTML / CSS / JS / React (based on your repo)
Backend	Python (Flask / FastAPI)
Database	MongoDB
▶️ How to Run the Project
1. Clone the repository
git clone https://github.com/Yesaswi33/rag_based_leagal_document_reader.git
cd rag_based_leagal_document_reader

2. Create virtual environment
python3 -m venv venv
source venv/bin/activate

3. Install dependencies
pip install -r requirements.txt

4. Start MongoDB
brew services start mongodb-community

5. Run Backend
python app.py

6. Run Frontend

(If React)

npm install
npm start

📌 Project Highlights

Handles real-world messy legal documents

Uses RAG to guarantee factual accuracy

Supports multi-document search using MongoDB vectors

Combines OCR + embeddings + similarity search + LLMs

Modular design, easy to extend
