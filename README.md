**Project Overview
**
This project is a Retrieval Augmented Generation (RAG) based legal document reader and summarization system. It is designed to process legal documents provided as images, extract text using OCR, convert that text into vector embeddings, and store them in a MongoDB vector database. Users can upload new legal documents, ask questions related to them, and receive context-aware answers or summaries generated using an LLM.

The system combines OCR, text chunking, embedding generation, vector similarity search, and a language model to produce accurate and document-aware responses in the legal domain.

**Key Features
Document Ingestion**

The system begins with an initial set of legal documents. These documents are processed to build the domain knowledge base.
If the document is an image, OCR is applied to extract text.
The extracted text is divided into chunks of a fixed token size to preserve context and improve retrieval quality.
Each chunk is converted into an embedding vector.
These vectors, along with metadata, are stored in MongoDB, which acts as the vector database for similarity search.

**User Document Processing
**
Users upload a legal document in image format.
OCR converts the image into text.
The text is chunked and converted into embeddings.
These embeddings are stored temporarily and are used to determine whether the user’s query is related to the uploaded document.

**Query Handling
**
The user enters a query along with the uploaded document.
The query is converted into an embedding.
Similarity is measured between the query vector and the vectors of the uploaded document chunks.
If the similarity score exceeds a defined threshold, the system treats the query as being related to the uploaded document and retrieves the matching chunks.
If the query is not related to the uploaded document, the system retrieves relevant chunks from the pre-stored legal knowledge base.

**Retrieval and Answer Generation
**
Relevant chunks are retrieved using vector similarity search.
The retrieved text is combined with the user’s query and passed to an LLM.
The model (Flan-T5 in this project) generates the final answer or summary.
The result is returned to the user through the frontend interface.
**
System Architecture
Frontend**

The frontend provides a simple interface for uploading documents, submitting queries, and displaying the generated answers.
It communicates with the backend using API endpoints.

**Backend
**
The backend handles OCR, chunking, embedding generation, vector storage, similarity search, and communication with the language model.
It exposes endpoints for document upload, query processing, and retrieval.

**Vector Database
**
MongoDB is used to store embedding vectors and associated metadata.
It maintains two types of records:

Domain knowledge base vectors generated during initial ingestion.

Temporary vectors generated from the user-uploaded document.

**Complete Workflow
**
Initial legal documents are processed and converted into vector embeddings.

These embeddings are stored in MongoDB to create the domain knowledge base.

The user uploads a legal document in image format.

OCR extracts text from the image.

The text is chunked and embedded.

The user submits a query.

The query is embedded and compared with the document vectors.

If relevant, results come from the uploaded document; otherwise, from the existing knowledge base.

Retrieved chunks and the query are sent to the LLM.

The LLM generates a summary or answer.

The final result is displayed to the user.

**Technologies Used
**
Python
OCR engine (Tesseract or equivalent)
Text chunking and tokenization tools
Embedding model for vector generation
MongoDB with vector search support
Flan-T5 model for summarization and answer generation
Frontend framework (React or equivalent)
Backend framework (FastAPI, Flask, or equivalent)
