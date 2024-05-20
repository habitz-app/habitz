package space.habitz.api.domain.member.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.Assert;
import space.habitz.api.domain.member.entity.Member;

public class AuthUtils {
    public static Long getAuthenticatedUserId(Authentication authentication){
        Assert.notNull(authentication, "인증되지 않았습니다.");
        Member member = (Member) authentication.getPrincipal();

        return member.getId();
    }

    public static Long getAuthenticatedUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return getAuthenticatedUserId(authentication);
    }

    public static Member getAuthenticatedMember(Authentication authentication){
        Assert.notNull(authentication, "인증되지 않았습니다.");
        return (Member) authentication.getPrincipal();
    }

    public static Member getAuthenticatedMember(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return getAuthenticatedMember(authentication);
    }

}
