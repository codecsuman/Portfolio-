#!/bin/bash
# =============================================================================
# PORTFOLIO - AUTO UPDATE SCRIPT
# =============================================================================
# This script helps automatically update PROJECT_INFO.md with new changes.
# Run after making significant changes: ./update-log.sh "Feature" "Added new project section" "src/sections/Projects.jsx"
# =============================================================================

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

PROJECT_INFO="PROJECT_INFO.md"
DATE=$(date +"%Y-%m-%d")

# Check arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Usage: $0 <type> <description> [files...]${NC}"
    echo ""
    echo "Types: Feature, Fix, Refactor, Style, Docs, Config, Chore"
    echo "Example: $0 Feature \"Added dark mode toggle\" \"src/components/ThemeToggle.jsx\" \"src/index.css\""
    exit 1
fi

TYPE="$1"
DESCRIPTION="$2"
shift 2
FILES="$@"

# Validate type
VALID_TYPES=("Feature" "Fix" "Refactor" "Style" "Docs" "Config" "Chore")
VALID=false
for t in "${VALID_TYPES[@]}"; do
    if [ "$t" = "$TYPE" ]; then
        VALID=true
        break
    fi
done

if [ "$VALID" = false ]; then
    echo -e "${RED}Invalid type: $TYPE${NC}"
    echo "Valid types: ${VALID_TYPES[*]}"
    exit 1
fi

# Build file list string
FILE_STR=""
if [ $# -gt 0 ]; then
    FILE_STR=" ("
    for f in "$@"; do
        FILE_STR="${FILE_STR}$f, "
    done
    FILE_STR="${FILE_STR%, })"
fi

# Create the entry
ENTRY="- **$TYPE**: $DESCRIPTION$FILE_STR"

# Check if PROJECT_INFO.md exists
if [ ! -f "$PROJECT_INFO" ]; then
    echo -e "${RED}$PROJECT_INFO not found!${NC}"
    exit 1
fi

# Create backup
cp "$PROJECT_INFO" "${PROJECT_INFO}.bak"

# Use sed to insert after "[Unreleased] - Current Development" section
# Find the line with "### [Unreleased]" and insert after the next empty line or dash
awk -v entry="$ENTRY" '
    /^### \[Unreleased\]/ { 
        print
        in_unreleased=1
        next
    }
    in_unreleased && /^### / { 
        in_unreleased=0
    }
    in_unreleased && /^$/ && !inserted {
        print entry
        print ""
        inserted=1
    }
    { print }
    END {
        if (in_unreleased && !inserted) {
            print entry
        }
    }
' "$PROJECT_INFO" > "${PROJECT_INFO}.tmp" && mv "${PROJECT_INFO}.tmp" "$PROJECT_INFO"

echo -e "${GREEN}✓ Updated $PROJECT_INFO${NC}"
echo -e "  Added: $ENTRY"

# Show the updated section
echo -e "${YELLOW}--- Updated Section ---${NC}"
grep -A 10 "### \[Unreleased\]" "$PROJECT_INFO" | head -15

# Clean up backup
rm -f "${PROJECT_INFO}.bak"