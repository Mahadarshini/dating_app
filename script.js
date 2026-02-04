       // Sample profiles data
        const profiles = [
            {
                id: 1,
                name: "Emma",
                age: 26,
                bio: "Love hiking, coffee, and good conversations. Looking for someone to explore the city with!",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            },
            {
                id: 2,
                name: "Sophie",
                age: 24,
                bio: "Artist and bookworm. Can't resist a good mystery novel or a spontaneous road trip.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
            },
            {
                id: 3,
                name: "Alex",
                age: 28,
                bio: "Foodie and travel enthusiast. Let's try that new restaurant everyone's talking about!",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
            },
            {
                id: 4,
                name: "Maya",
                age: 25,
                bio: "Yoga instructor by day, salsa dancer by night. Living life one adventure at a time.",
                image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop"
            },
            {
                id: 5,
                name: "Olivia",
                age: 27,
                bio: "Tech geek who loves vintage vinyl. Looking for someone who appreciates both coding and concerts.",
                image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop"
            },
            {
                id: 6,
                name: "Zoe",
                age: 23,
                bio: "Psychology student with a passion for photography. Let's capture beautiful moments together!",
                image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop"
            },
            {
                id: 7,
                name: "Luna",
                age: 29,
                bio: "Chef who believes the way to the heart is through the stomach. Wine and dine with me?",
                image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop"
            },
            {
                id: 8,
                name: "Aria",
                age: 26,
                bio: "Marine biologist saving the ocean one dive at a time. Love nature and adventure!",
                image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop"
            }
        ];

        // Stack to hold profiles (LIFO - Last In First Out)
        let profileStack = [];
        
        // Arrays to store selected and rejected profiles
        let selectedProfiles = [];
        let rejectedProfiles = [];
        
        let currentCard = null;
        let isAnimating = false;

        // Initialize the application
        function init() {
            // Push all profiles to stack (reverse order so first profile is on top)
            for (let i = profiles.length - 1; i >= 0; i--) {
                profileStack.push(profiles[i]);
            }
            updateRemainingCount();
            showNextProfile();
        }

        // Pop profile from stack and display it
        function showNextProfile() {
            if (profileStack.length === 0) {
                showNoProfiles();
                return;
            }

            // Pop from stack
            const profile = profileStack.pop();
            currentCard = profile;
            
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = `
                <div class="profile-card" id="currentCard">
                    <img src="${profile.image}" alt="${profile.name}" class="profile-image">
                    <div class="profile-info">
                        <div class="profile-name">${profile.name}</div>
                        <div class="profile-age">${profile.age} years old</div>
                        <div class="profile-bio">${profile.bio}</div>
                    </div>
                </div>
            `;

            updateRemainingCount();
            setupSwipeGesture();
        }

        // Setup touch/mouse swipe gestures
        function setupSwipeGesture() {
            const card = document.getElementById('currentCard');
            if (!card) return;

            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            card.addEventListener('mousedown', dragStart);
            card.addEventListener('touchstart', dragStart);
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag);
            
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);

            function dragStart(e) {
                if (isAnimating) return;
                isDragging = true;
                startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
            }

            function drag(e) {
                if (!isDragging) return;
                currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
                const diff = currentX - startX;
                const rotation = diff * 0.1;
                card.style.transform = `translateX(${diff}px) rotate(${rotation}deg)`;
            }

            function dragEnd() {
                if (!isDragging) return;
                isDragging = false;
                const diff = currentX - startX;
                
                if (Math.abs(diff) > 100) {
                    if (diff > 0) {
                        swipeRight();
                    } else {
                        swipeLeft();
                    }
                } else {
                    card.style.transform = '';
                }
            }
        }

        // Swipe left (reject)
        function swipeLeft() {
            if (isAnimating || !currentCard) return;
            isAnimating = true;

            const card = document.getElementById('currentCard');
            card.classList.add('swipe-left');

            // Add to rejected profiles array (push operation)
            rejectedProfiles.push(currentCard);
            updateCounts();

            setTimeout(() => {
                isAnimating = false;
                showNextProfile();
            }, 500);
        }

        // Swipe right (accept)
        function swipeRight() {
            if (isAnimating || !currentCard) return;
            isAnimating = true;

            const card = document.getElementById('currentCard');
            card.classList.add('swipe-right');

            // Add to selected profiles array (push operation)
            selectedProfiles.push(currentCard);
            updateCounts();

            setTimeout(() => {
                isAnimating = false;
                showNextProfile();
            }, 500);
        }

        // Update counts
        function updateCounts() {
            document.getElementById('rejected-count').textContent = rejectedProfiles.length;
            document.getElementById('selected-count').textContent = selectedProfiles.length;
        }

        // Update remaining count
        function updateRemainingCount() {
            document.getElementById('remaining-count').textContent = profileStack.length;
        }

        // Show no profiles message
        function showNoProfiles() {
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = `
                <div class="no-profiles">
                    <h2>🎉 All Done!</h2>
                    <p>You've reviewed all profiles</p>
                </div>
            `;
            document.getElementById('buttonContainer').style.display = 'none';
        }

        // Show details modal
        function showDetails() {
            const modal = document.getElementById('detailsModal');
            modal.classList.add('active');

            document.getElementById('modal-selected-count').textContent = selectedProfiles.length;
            document.getElementById('modal-rejected-count').textContent = rejectedProfiles.length;

            renderProfileList('selected-list', selectedProfiles);
            renderProfileList('rejected-list', rejectedProfiles);
        }

        // Render profile list
        function renderProfileList(elementId, profiles) {
            const container = document.getElementById(elementId);
            
            if (profiles.length === 0) {
                container.innerHTML = '<div class="empty-state">No profiles yet</div>';
                return;
            }

            container.innerHTML = profiles.map(profile => `
                <div class="profile-item">
                    <img src="${profile.image}" alt="${profile.name}" class="profile-item-image">
                    <div class="profile-item-info">
                        <div class="profile-item-name">${profile.name}, ${profile.age}</div>
                        <div class="profile-item-bio">${profile.bio}</div>
                    </div>
                </div>
            `).join('');
        }

        // Close modal
        function closeModal() {
            document.getElementById('detailsModal').classList.remove('active');
        }

        // Initialize app on page load
        init();