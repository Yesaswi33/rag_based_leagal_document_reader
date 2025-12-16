## RAG-Based Legal Document Reader

### Overview

This project is a **domain-specific Retrieval-Augmented Generation (RAG) system** designed for **legal document understanding**, including **summarization, question answering, and information extraction**.

The system allows users to upload **scanned legal document images**, performs **OCR-based text extraction**, converts the text into **vector embeddings**, and retrieves the most relevant content using **vector similarity search** before generating accurate responses with **Flan-T5**.

The solution ensures **context-aware, factually grounded answers** by combining retrieval and generation.

---

## What the System Supports

* Summarization of long legal documents
* OCR-based text extraction from scanned images
* Intelligent legal question answering
* Domain-specific contextual retrieval
* Automatic decision-making:

  * Answer from uploaded document **or**
  * Answer from pre-built legal knowledge base

---

## Key Features

### OCR-Based Document Processing

* Accepts scanned legal documents (JPG, PNG)
* Uses OCR to extract clean, machine-readable text
* Handles noisy and real-world legal document scans

---

### Intelligent Text Chunking

* Extracted text is split into chunks of approximately **1000 tokens**
* Ensures efficient embedding and retrieval
* Enables processing of long legal documents without loss of context

---

### Vector Embeddings and Vector Database

* Each text chunk is converted into a vector embedding
* Stored in **MongoDB Vector Search** (with optional FAISS support)
* Two vector sources are maintained:

  * Pre-loaded legal knowledge base
  * User-uploaded document chunks

This design allows scalable and efficient similarity search.

---

### Smart Query Routing

When a user submits a query, the system determines the most relevant source:

* If the query is closely related to the uploaded document
  → Retrieve from **uploaded document vectors**
* Otherwise
  → Retrieve from **pre-built legal knowledge base vectors**

This routing mechanism ensures **high contextual relevance** and prevents hallucinated answers.

---

### RAG Workflow with Flan-T5

* Top-k relevant chunks are retrieved via vector similarity
* Retrieved context + user query are passed to **Flan-T5**
* The model generates:

  * Legal summaries
  * Explanations
  * Direct answers to legal questions

This RAG setup ensures responses remain grounded in retrieved legal text.

---

## Backend Workflow

### 1. Knowledge Base Creation

Legal documents
→ OCR
→ Text chunking
→ Embedding generation
→ Stored in MongoDB as vector records

---

### 2. User Upload Flow

* User uploads a legal document image
* OCR extracts text
* Text is chunked
* Embeddings are generated
* Stored temporarily as `input_doc_chunks` in MongoDB

---

### 3. Query Flow

* User submits a query
* Query is embedded
* Similarity search is performed
* System decides:

  * Use uploaded document chunks **or**
  * Use knowledge base chunks
* Top-k chunks retrieved
* Flan-T5 generates the final response
* Answer is returned to the frontend

---

## Frontend

* Document upload interface
* Query input field
* Clean display of generated responses
* Designed to be simple, fast, and user-friendly

Frontend can be implemented using **HTML/CSS/JS or React**, depending on deployment setup.

---

## Technologies Used

| Component     | Technology                       |
| ------------- | -------------------------------- |
| OCR           | Tesseract / EasyOCR              |
| Embeddings    | Sentence Transformers or similar |
| Vector Search | MongoDB Vector Search / FAISS    |
| LLM           | Flan-T5                          |
| Backend       | Python (Flask / FastAPI)         |
| Frontend      | HTML / CSS / JS / React          |
| Database      | MongoDB                          |

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Yesaswi33/rag_based_leagal_document_reader.git
cd rag_based_leagal_document_reader
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start MongoDB

```bash
brew services start mongodb-community
```

### 5. Run Backend

```bash
python app.py
```

### 6. Run Frontend (If React)

```bash
npm install
npm start
```

---

## Project Highlights

* Handles real-world, messy legal documents
* Uses RAG to guarantee factual accuracy
* Supports multi-document similarity search
* Combines OCR, embeddings, vector databases, and LLMs
* Modular and extensible architecture

---

## Summary

This project demonstrates a **full end-to-end RAG pipeline** tailored for the legal domain.
By combining **OCR, intelligent retrieval, and LLM-based generation**, the system delivers accurate, explainable, and context-aware legal insights suitable for real-world applications.


