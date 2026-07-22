# PROJECT 1: CUBO - Secure Local Document Intelligence Platform

## Product Requirements Document (PRD)

---

## 1. EXECUTIVE SUMMARY

**Project Name:** CUBO (Confidential Universal Business Operations)

**Description:** A fully local, air-gapped Retrieval-Augmented Generation (RAG) platform that enables organizations to search through sensitive documents (PDFs, CSVs, Word files) using AI, completely offline with zero cloud dependencies.

**Target Users:** Law firms, medical centers, financial institutions, government agencies

**Problem Statement:** Organizations handling sensitive data face conflicting demands:
- **GDPR Compliance:** Cannot send data to cloud
- **AI Power:** Need intelligent search and analysis
- **Infrastructure Constraint:** Cannot afford 18-32GB RAM systems
- **Cost:** Cloud API costs for document processing ($0.001-0.01 per document)

**Solution:** CUBO runs entirely on a 16GB laptop using quantized models, streaming ingestion, and tiered indexing.

---

## 2. PRODUCT VISION & OBJECTIVES

### 2.1 Vision Statement
*"Enable organizations to deploy enterprise-grade AI document intelligence on consumer hardware without sacrificing privacy, compliance, or performance."*

### 2.2 Core Objectives
1. **Privacy-First:** 100% on-device processing, zero data transmission
2. **GDPR Compliant:** Built-in compliance logging and data retention policies
3. **Performance:** 45+ tokens/sec generation, ~185ms retrieval latency
4. **Scalability:** Process document archives larger than 50GB on 16GB RAM
5. **Cost-Effective:** Zero recurring cloud API costs

### 2.3 Success Metrics
| Metric | Target | Current |
|--------|--------|---------|
| Retrieval Latency (P50) | <200ms | 185ms ✓ |
| Generation Speed | 45+ tokens/sec | 45-50 tokens/sec ✓ |
| Memory Footprint | <6GB VRAM | 3.8GB ✓ |
| Document Processing | 10,000+ docs | Unlimited ✓ |
| Compliance Audit Ready | Yes | Yes ✓ |

---

## 3. FEATURE SPECIFICATIONS

### 3.1 Core Features

#### Feature 1: Multi-Format Document Ingestion
**Description:** Accept multiple document formats and parse them efficiently

**Supported Formats:**
- PDF (text & scanned with OCR)
- DOCX (Microsoft Word)
- CSV & Excel
- TXT, JSON, XML
- Email archives (MBOX, PST)

**Technical Implementation:**
```
Ingestion Pipeline:
├── File Format Detection
├── Content Extraction
│   ├── PDF → PyPDF/pdfplumber
│   ├── DOCX → python-docx
│   ├── CSV → pandas
│   └── Scanned → Tesseract OCR
├── Text Normalization
├── Chunking (512-token segments with 50-token overlap)
└── Parquet Shard Writing
```

**Performance Targets:**
- 50GB document corpus processed in <2 hours
- Memory footprint: 30-44MB (constant, O(1) complexity)
- Automatic garbage collection after each shard

---

#### Feature 2: Streaming Parquet Processor
**Description:** Process documents in batches without loading entire corpus into RAM

**Architecture:**
```
Streaming Processor:
├── Input Queue (10 documents)
├── Vectorization Engine
│   └── Sentence Transformers (all-MiniLM-L6-v2)
├── Chunking with Overlap
├── Parquet Writer (64MB chunks)
└── Deletion & GC Trigger
```

**Key Metrics:**
- Batch Size: 10 documents
- Vector Dimension: 384 (from all-MiniLM-L6-v2)
- Shard Size: 64MB
- Memory overhead: O(1) - constant regardless of corpus size

---

#### Feature 3: Tiered Hybrid Retrieval
**Description:** Combine sparse (keyword) and dense (semantic) search

**Tier 1 - Hot Tier (Sparse Retrieval):**
- Engine: BM25 (Okapi algorithm)
- Storage: System RAM
- Speed: <10ms
- Use Case: Exact phrase matching, regulatory citations

**Tier 2 - Cold Tier (Dense Semantic Search):**
- Engine: FAISS with 8-bit IVFPQ quantization
- Storage: OS memory-mapped files (mmap)
- Compression: 384× reduction (384 dimensions → 1 byte per dimension)
- Speed: <100ms
- Use Case: Conceptual similarity, semantic understanding

**Fusion Strategy - Reciprocal Rank Fusion (RRF):**
```
Combined Score = 1/(k + rank_sparse) + 1/(k + rank_dense)
where k = 60 (damping factor)
```

**Quantization-Aware Router (QAR):**
```
Score_adjusted = Score_q × (1 - β × Δ_q)

Where:
- Score_q = distance from 8-bit IVFPQ index
- β = 0.15 (scaling hyperparameter)
- Δ_q = quantization distortion metric
```

---

#### Feature 4: Quantized Local LLM Generation
**Description:** Generate contextual responses using quantized Llama-3.2-3B

**Model Configuration:**
```
Model: Llama-3.2-3B-Instruct
Format: Q4_K_M GGUF (4-bit quantization)
VRAM: 2.2GB (base weights)
Available: 3.8GB for KV cache & inference

Inference Settings:
├── Context Window: 8,192 tokens
├── KV Cache Precision: 4-bit (q4_0)
├── Batch Size: 1
├── Temperature: 0.7
└── Top-p Sampling: 0.95
```

**Generation Pipeline:**
```
User Query
    ↓
Vector Search (Retrieval)
    ↓
Context Ranking (Top-5 documents)
    ↓
Prompt Construction (System + Context + Query)
    ↓
Llama Inference (Ollama orchestration)
    ↓
Response Streaming (Token-by-token)
    ↓
Quality Filter (Confidence scoring)
```

**Retrieval Latency Breakdown:**
- Sparse search: 5-10ms
- Dense search: 80-100ms
- Reranking: 10-15ms
- **Total P50: 185ms**

---

#### Feature 5: GDPR Compliance & Data Governance
**Description:** Built-in logging, audit trails, and data retention

**Components:**
1. **Audit Logging**
   - Query log: User ID, timestamp, query text, retrieved documents
   - Access log: IP, timestamp, documents accessed
   - Retention: Configurable (default 30 days)

2. **Data Retention Policy**
   - Automatic document deletion after configured period
   - Compliance reports generation
   - Right-to-be-forgotten implementation

3. **Encryption at Rest**
   - Parquet shards: AES-256 encryption
   - Metadata: Encrypted with per-organization key
   - Key management: Local HSM support (optional)

4. **Access Control**
   - Role-based access control (RBAC)
   - Document-level permissions
   - API key management

---

### 3.2 Secondary Features

#### Feature 6: Web UI Dashboard
**Description:** Web interface for document management and search (built with Google Stitch)

**Pages:**
1. **Search Interface**
   - Query input with auto-complete
   - Real-time result preview
   - Source document highlighting
   - Confidence scoring visualization

2. **Document Manager**
   - Upload progress tracking
   - Bulk import (drag & drop)
   - Document deletion with compliance confirmation
   - Storage usage dashboard

3. **Analytics Dashboard**
   - Query volume trends
   - Popular search terms
   - Retrieval latency metrics
   - System resource utilization

4. **Settings & Configuration**
   - Retrieval settings (BM25 weight, FAISS parameters)
   - Model configuration (temperature, context window)
   - Compliance settings (retention policy)
   - User management

---

#### Feature 7: Batch Processing API
**Description:** Server-side API for programmatic access

**Endpoints:**
```
POST /api/documents/upload
POST /api/documents/batch-upload
POST /api/search
POST /api/search/advanced
GET /api/documents/{id}
DELETE /api/documents/{id}
GET /api/analytics/usage
POST /api/compliance/audit-log
```

**Authentication:** API keys with scoping

---

## 4. TECHNICAL ARCHITECTURE

### 4.1 System Architecture Diagram
```
┌─────────────────────────────────────────────────┐
│              User Interface Layer               │
│  Web Dashboard (React) + Google Stitch UI/UX   │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│          Application Layer (FastAPI)            │
│  - Query Handler   - Upload Manager             │
│  - Search Router   - Compliance Logger          │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│          Indexing & Retrieval Layer             │
│  ┌──────────────────────────────────────────┐  │
│  │ Hot Tier: BM25 Index (System RAM)       │  │
│  └──────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────┐  │
│  │ Cold Tier: FAISS 8-bit IVFPQ (mmap)     │  │
│  │ Quantization-Aware Router (QAR)         │  │
│  └──────────────────────────────────────────┘  │
└────────────┬────────────────────────────────────┘
             │
┌────────────┼────────────────────────────────────┐
│   Ingestion & Generation Layer                 │
│  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Streaming    │  │ Quantized Llama-3.2  │   │
│  │ Parquet      │  │ via Ollama           │   │
│  │ Processor    │  │ (Q4_K_M GGUF)        │   │
│  └──────────────┘  └──────────────────────┘   │
└────────────┬────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│          Persistent Storage Layer               │
│  ┌────────────┐ ┌──────────┐ ┌──────────────┐ │
│  │ Parquet    │ │ SQLite   │ │ AES-256      │ │
│  │ Shards     │ │ Metadata │ │ Encryption   │ │
│  └────────────┘ └──────────┘ └──────────────┘ │
└─────────────────────────────────────────────────┘
```

### 4.2 Hardware Constraints & Resource Allocation
```
System: 16GB RAM Laptop + NVIDIA RTX 4050 (6GB VRAM)

Resource Allocation:
├── OS & Background: 2.5GB
├── Application & Frameworks: 1.2GB
├── BM25 Index (System RAM): 2.0GB
├── Pandas & Processing: 0.8GB
├── Free Margin: 1.5GB
└── GPU Memory:
    ├── Llama Model Weights: 2.2GB
    ├── Sentence Transformer: 0.8GB
    ├── KV Cache: 1.0GB (for 8,192 context)
    └── Free: 0.2GB (for inference buffers)
```

---

## 5. USER FLOWS

### 5.1 Document Upload & Indexing Flow
```
1. User selects files (PDF, DOCX, CSV)
2. Frontend validates file types & sizes
3. Backend ingests with streaming processor:
   a. Extract text (with OCR for scanned)
   b. Normalize & chunk (512 tokens, 50-token overlap)
   c. Vectorize with Sentence Transformer
   d. Write to Parquet shards (64MB chunks)
   e. Update BM25 index
   f. Trigger garbage collection
4. Compliance logger records ingestion event
5. User sees "Upload Complete" with doc count
```

### 5.2 Search & Retrieval Flow
```
1. User enters query in search box
2. Query preprocessing (normalization, expansion)
3. Parallel retrieval:
   a. BM25 sparse search → Top 20 results
   b. Dense semantic search → Top 20 results
4. Reciprocal Rank Fusion (RRF) merging
5. Reranking with Quantization-Aware Router
6. Context compilation (Top-5 documents)
7. Prompt construction with safety checks
8. Llama inference with streaming response
9. Confidence scoring & result ranking
10. Display to user with source documents
```

### 5.3 Compliance & Audit Flow
```
1. Every search/document access logged
2. Audit log: User, timestamp, action, document IDs
3. Daily compliance report generation
4. Data retention policy enforcement
5. Automatic deletion after retention period
6. Export audit trail on request
```

---

## 6. UI/UX DESIGN SPECIFICATIONS (Google Stitch Integration)

### 6.1 Design System
**Color Palette:**
- Primary: #2563EB (Blue)
- Secondary: #10B981 (Green)
- Danger: #EF4444 (Red)
- Background: #F9FAFB (Light Gray)
- Text: #111827 (Dark Gray)

**Typography:**
- Headings: Inter Bold (24px, 20px, 18px)
- Body: Inter Regular (16px)
- Captions: Inter Regular (14px)

**Components:**
- Cards with shadow on hover
- Search bar with real-time suggestions
- Progress bars for upload
- Toggles for settings
- Modal dialogs for confirmations

### 6.2 Key UI Pages

**Page 1: Search Dashboard**
```
┌─────────────────────────────────────────┐
│ CUBO - Secure Document Intelligence     │
├─────────────────────────────────────────┤
│                                          │
│  [Search Query Input Box]                │
│  [Advanced Search] [Filters]             │
│                                          │
│  Results:                                │
│  ┌──────────────────────────────────┐   │
│  │ Document 1: Relevance 92%        │   │
│  │ "...matched text snippet..."     │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ Document 2: Relevance 87%        │   │
│  │ "...matched text snippet..."     │   │
│  └──────────────────────────────────┘   │
│                                          │
│  Suggested Response: [Show AI Answer]   │
└─────────────────────────────────────────┘
```

**Page 2: Upload Manager**
```
┌─────────────────────────────────────────┐
│ Document Manager                        │
├─────────────────────────────────────────┤
│ [+ Upload Documents] [Bulk Import]      │
│                                          │
│ Storage: 45.2 GB / 100 GB (45%)         │
│ ████████░░                              │
│                                          │
│ Recent Uploads:                         │
│ ┌──────────────────────────────────┐   │
│ │ contract_2024.pdf - 2.3 MB       │   │
│ │ ✓ Indexed - 156 chunks           │   │
│ └──────────────────────────────────┘   │
│                                          │
│ ┌──────────────────────────────────┐   │
│ │ financial_report.xlsx - 1.1 MB   │   │
│ │ ✓ Indexed - 89 chunks            │   │
│ └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Page 3: Settings & Configuration**
```
┌─────────────────────────────────────────┐
│ Settings                                │
├─────────────────────────────────────────┤
│                                          │
│ Retrieval Configuration:                │
│ ├─ BM25 Weight: [Slider 0.3 to 0.7]    │
│ ├─ FAISS Nprobe: [Slider 4 to 32]      │
│ └─ Top-K Results: [Dropdown: 5, 10, 20]│
│                                          │
│ Generation Settings:                    │
│ ├─ Temperature: [Slider 0.1 to 1.0]    │
│ ├─ Max Tokens: [Dropdown: 256 to 2048]│
│ └─ Top-P Sampling: [Toggle]            │
│                                          │
│ GDPR Compliance:                        │
│ ├─ Data Retention: [30 days]           │
│ ├─ Audit Logging: [Enabled]            │
│ └─ Encryption: [AES-256 Enabled]       │
│                                          │
│ [Save Settings] [Reset to Defaults]    │
└─────────────────────────────────────────┘
```

---

## 7. PERFORMANCE METRICS & BENCHMARKS

### 7.1 Response Time Targets
| Operation | P50 | P95 | P99 |
|-----------|-----|-----|-----|
| Sparse Search (BM25) | 8ms | 12ms | 15ms |
| Dense Search (FAISS) | 85ms | 110ms | 140ms |
| RRF Fusion | 12ms | 18ms | 25ms |
| LLM Inference (per token) | 20ms | 30ms | 50ms |
| **Total Retrieval** | **185ms** | **220ms** | **280ms** |
| **Full E2E** (retrieval + gen) | **4.5s** | **6.2s** | **8.1s** |

### 7.2 Scalability Targets
- Document corpus: Unlimited (>100GB tested)
- Concurrent users: 1 (single-machine deployment)
- Index size: <20GB for 100,000 documents
- Memory usage: Constant O(1) for ingestion

### 7.3 Accuracy Metrics
- Retrieval Precision@5: >92%
- Retrieval Recall@10: >88%
- Generation Factuality: >95% (verified with document)
- Compliance Audit Pass Rate: 100%

---

## 8. DEPLOYMENT & ROLLOUT STRATEGY

### 8.1 Deployment Phases

**Phase 1: Internal Testing (Week 1-2)**
- Single laptop deployment
- Internal document corpus (legal contracts)
- Performance profiling
- Security audit

**Phase 2: Beta Release (Week 3-4)**
- Deploy to 5 legal firms
- Gather feedback
- Optimize based on real-world usage
- Compliance certification

**Phase 3: Production Release (Week 5+)**
- General availability
- Docker containerization
- Multi-node deployment (optional)
- Enterprise support tiers

### 8.2 Installation Requirements
```
Hardware:
├─ CPU: Intel i7/AMD Ryzen 7 (8-core minimum)
├─ RAM: 16GB (8GB minimum, 32GB recommended)
├─ GPU: NVIDIA RTX 4050+ (6GB VRAM minimum)
└─ Storage: 50GB SSD for models & shards

Software:
├─ OS: Linux (Ubuntu 22.04+), macOS 12+, Windows 11
├─ Python: 3.10+
├─ CUDA: 12.1+
├─ Runtime: Ollama 0.1.25+
└─ Database: SQLite3 (built-in)

Optional:
├─ Docker: 24.0+
└─ Kubernetes: 1.28+ (for scaled deployments)
```

---

## 9. SUCCESS CRITERIA

### 9.1 Must Have (MVP)
- [x] Multi-format document ingestion (PDF, DOCX, CSV)
- [x] Streaming processor with O(1) memory
- [x] BM25 + FAISS hybrid search
- [x] Llama-3.2-3B inference on 6GB VRAM
- [x] GDPR compliance logging
- [x] Web UI search interface
- [x] 185ms P50 retrieval latency
- [x] 45+ tokens/sec generation

### 9.2 Should Have (v1.0)
- [ ] Bulk document import with progress tracking
- [ ] Advanced search filters & facets
- [ ] Compliance report generation
- [ ] Multi-user access control
- [ ] API rate limiting
- [ ] Docker deployment template

### 9.3 Nice to Have (Future)
- [ ] Multi-GPU scaling
- [ ] Alternative model support (Qwen, Mistral)
- [ ] Document fingerprinting (PII detection)
- [ ] Audit dashboard with real-time logs
- [ ] Knowledge graph extraction
- [ ] Fine-tuning on organization-specific data

---

## 10. RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|-----------|
| VRAM overflow with large contexts | Critical | KV cache quantization, context limiting |
| Quantization accuracy loss | High | QAR correction formula, validation tests |
| OCR errors on scanned documents | Medium | Manual review mode, confidence threshold |
| Search index corruption | High | Automatic backups, integrity checks |
| Compliance audit failures | Critical | Built-in audit logging, automated reports |

---

## 11. TIMELINE & MILESTONES

| Week | Milestone | Deliverable |
|------|-----------|------------|
| 1-2 | Architecture finalized | Tech spec, deployment plan |
| 3-4 | MVP development | Working prototype |
| 5 | Testing & optimization | Performance benchmarks |
| 6 | Compliance audit | Certification |
| 7+ | Production release | Docker image, documentation |

---

## 12. APPENDIX

### 12.1 Glossary
- **RAG:** Retrieval-Augmented Generation
- **GDPR:** General Data Protection Regulation
- **VRAM:** Video RAM (GPU memory)
- **BM25:** Okapi Best Matching 25 (sparse ranking)
- **FAISS:** Facebook AI Similarity Search
- **IVFPQ:** Inverse File Product Quantization
- **QAR:** Quantization-Aware Router
- **GGUF:** GPT-Generated Unified Format

### 12.2 References
- FAISS Documentation: https://github.com/facebookresearch/faiss
- Llama Model Card: https://huggingface.co/meta-llama/Llama-3.2-3b
- GDPR Article 5: https://gdpr-info.eu/article-5/

---

**Document Version:** 1.0  
**Last Updated:** July 2026  
**Status:** Approved for Development  
**Owner:** AI Systems Team
